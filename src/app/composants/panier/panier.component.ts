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
  userClient: any= [];


  constructor(private authService : LoginService, private router: Router, private panierService: PanierService,private LegumesService:LegumesService,  private cdr: ChangeDetectorRef, private commande: CommandeService) {}
  ngOnInit(): void {

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.connectUser = isAuthenticated;
    });

    // this.authService.user$.subscribe((user) => {
    //     this.userClient = {
    //     image: user.image,
    //     nom: user.nom,
    //     prenom: user.prenom,
    //   };
    //   console.log('Image:', this.userClient.image);
    //   console.log('Nom:', this.userClient.nom);
    //   console.log('Prenom:', this.userClient.prenom);
    // });

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
    // console.log('total',this.totalProduit),
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
      // idUser: number = 0;



      // variable pour adresse
      adresseLivraison: string = '';

  isOnline() {
    let panier = JSON.parse(localStorage.getItem('panier') ?? '[]');
    console.log('Valeur du panier dans le localStorage:', panier);

    if (panier.length == 0) {
      this.panierService.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }
    else {
      this.panierService.isAuthenticated$.subscribe((isAuthenticated) => {
        if (this.connectUser == isAuthenticated) {
          console.log(this.connectUser);
          this.panierService.message('Oop\'s', 'error', 'La connexion est requise pour cette action');
        }
        else {

          let panierProduitUser: any[] = [];
          panier.forEach((element: any) => {
            panierProduitUser.push({
              produit_id: element.produit.id,
              nombre_produit: element.quantitePanier,
              montant: element.produit.prix * element.quantitePanier,
              });
          });

          let panierToSend = {
            panier: panierProduitUser,
            adresse_de_livraison: this.adresseLivraison,
          };

          console.log('panierSend', panierToSend);

          this.commande.submitCommande(panierToSend).subscribe(
            (rep) => {
              // Mettez à jour le panier local et affichez le message de confirmation ici
              this.panierService.message('Commande envoyée', 'success', 'Merci pour la confiance');
              this.commandeAllPanier();

            //   rep = this.userClient;
            //  console.log('Imagerepp:', this.userClient.image);
            //   console.log('Nom:', this.userClient.nom);
            //   console.log('Prenom:', this.userClient.prenom);
            // const userName = userDetails.nom;
            // const userFirstName = userDetails.prenom;
            },
            (erreur: any) => {
              console.error("Erreur lors de la requête HTTP :", erreur);
            }
          );
        }
      });
    };
  }


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
