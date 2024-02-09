import { GuardService } from './../../services/guard/guard.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Panier } from 'src/app/models/login';
import { PanierService } from 'src/app/services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { LoginService } from 'src/app/services/login/login.service';
import { CommandeService } from 'src/app/services/commande/commande.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  // produit: any[];

  produits: Panier = new Panier();
  nom: string = "";
  prix:number =0;
  image: string = "";
  total: number= 0;

  public quantite = 1;
  public nbpanier=0;
  public panier: any = [];
  public nombreLegumes = 0;
  public sommeLegumes = 0;
  public prixLivraion = this.panierService.prixLivraion;

  tabListProduit: any[] = [];

  //
  connectUser: boolean = false;


  constructor(private authService : LoginService, private router: Router, private panierService: PanierService,private LegumesService:LegumesService,  private cdr: ChangeDetectorRef, private commande: CommandeService) {}
  ngOnInit(): void {

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.connectUser = isAuthenticated;
    });

    this.listerDesProduits();
    // this.produitsPanier = this.panierService.getLegumes();
    this.panier = this.panierService.getFromPanier();
    this.totalProduit();
    // this.isOnline();
  }


  upOrDownQuantity(type: string, id: any) {
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
      // console.log('ajout', panierProduit)
      if (element.produit.id == id) {
        if (type == 'up') {
          this.quantite++;
          element.quantitePanier++;
          if (element.quantitePanier>element.produit.quantite) {
            element.quantitePanier--;
            this.panierService.message("Oops","warning",`il n'en reste que ${element.produit.quantite} produit en stock`);
          }
        } else {
          // this.quantite--;
          element.quantitePanier--;
          if (element.quantitePanier < 1) {
            element.quantitePanier = 1;
          }
        }
      }
      // console.log('increment',this.upOrDownQuantity)
    });
    localStorage.setItem("panier", JSON.stringify(panierProduit));
    this.totalProduit();
    this.panier = this.panierService.getFromPanier();
    this.nbpanier= (panierProduit.length);
    this.cdr.detectChanges();
    console.log('nombbre',this.nbpanier)
  }

  totalProduit() {
    this.nombreLegumes = 0;
    this.sommeLegumes = 0;
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
    this.nombreLegumes += element.quantitePanier;
    this.sommeLegumes += element.quantitePanier * element.produit.prix;
    });
    // console.log('total',this.totalProduit)

  }

  // methode pour incermenter
  increment( quantite = 1) {
    this.panierService.incrementerQuantite(quantite);
    console.log('svpppp',quantite)
    // this.produitsPanier = this.panierService.getLegumes();
  }
  // methode supprimer
  deleteFromPanier(id: any) {
    let tab: any = [];
    tab = this.panierService.getFromPanier();
    tab.forEach((element: any, index: any) => {
      if (element.produit.id == id) {
        tab.splice(index, 1);
      }
    });
    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.panierService.getFromPanier();
    this.panierService.message("Parfait", "success", "produit retiré du panier");
    this.totalProduit();

  }

  deleteAllPanier() {
    let tab: any = [];
    tab = this.panierService.getFromPanier();

    // Vider le tableau
    tab = [];

    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.panierService.getFromPanier();
    this.panierService.message("Parfait", "success", "Panier vidé avec succès");
    this.totalProduit();
  }

  commandeAllPanier() {
    let tab: any = [];
    tab = this.panierService.getFromPanier();

    // Vider le tableau
    tab = [];

    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.panierService.getFromPanier();
    // this.panierService.message("Parfait", "success", "Panier vidé avec succès");
    this.totalProduit();
  }

      // variables pour se connecter
      formDate:any = {
        email : '',
        password : '',
        createAt: new Date(),
        updateAt: "",
      }

  isOnline() {
    let panier = JSON.parse(localStorage.getItem('panier') ?? '[]');
    if (panier.length == 0) {

      this.panierService.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }
    else{
      this.panierService.isAuthenticated$.subscribe((isAuthenticated) => {
        if (this.connectUser == isAuthenticated) {
          // this.router.navigate(['/connexion']);
            // alert('La connexion est requise pour cette action')
            console.log(this.connectUser);
            this.panierService.message('Oop\'s', 'error', 'La connexion est requise pour cette action');
        }
        else {
          this.commande.submitCommande().subscribe(
            (rep) => {
              console.log('commande', rep);
              localStorage.setItem('userConnect', rep.token);
            },

            )
            this.panierService.message('Commande envoyée', 'success', 'Merci pour la confiance');
          this.commandeAllPanier();
        }
      });

    }
  }

  // evoie dans la base de données 
  // payer() {
  //   // let panier = this.LegumesService.getFromPanier();
  //   let panier : any = [] ;
  //   let panierProduit: any[] = [];

  //   panier.forEach((element: any) => {
  //     panierProduit.push({
  //       produit_id: element.produit.id,
  //       nombre_produit: element.quantitePanier,
  //       montant: element.produit.prix*element.quantitePanier
  //     });
  //   });
  //   let panierToSend = {
  //     panier: panierProduit
  //   }
  //   console.log(panierToSend);

  //   this.service.post("api/passerCommande", panierToSend, ((reponse: any) => {
  //     window.open(reponse.payment_url,"_self");
  //   }));
  // }

    //  pour recuperer un produit
    produitSelectionner: any = {};

    getProduit(produit: any) {
      this.produitSelectionner = produit;
    }

   // le tableau
  listerDesProduits(){
    this.LegumesService.listerDesProduits().subscribe((data) => {
    // console.log("listeProduits", data.ListeProduit);
    this.tabListProduit = data.ListeProduit;
     } ) }


}
