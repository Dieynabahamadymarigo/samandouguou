import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Panier } from 'src/app/models/login';
import { PanierService } from 'src/app/services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';

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
  // quantite: number= 0;
  total: number= 0;

  public quantite = 1;
  public nbpanier=0;
  public panier: any = [];
  public nombreLegumes = 0;
  public sommeLegumes = 0;
  public prixLivraion = this.panierService.prixLivraion;
  // produit: any[];

  //

  tabListProduit: any[] = [];

  // produitsPanier: any[] = [];

  //
  connectUser: boolean = false;


  constructor(private panierService: PanierService,private LegumesService:LegumesService,  private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {

    this.listerDesProduits();
    // this.produitsPanier = this.panierService.getLegumes();
    this.panier = this.panierService.getFromPanier();
    this.totalProduit();
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


  isOnline() {
    let a = JSON.parse(localStorage.getItem('panier') ?? '[]');
    // console.log(a.length);
    if (a.length == 0) {

      this.panierService.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }else{
      this.panierService.isAuthenticated$.subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.panierService.message('Oop\'s', 'error', 'La connexion est requise pour cette action');
        } else {
          // L'utilisateur est connecté, vous pouvez maintenant procéder à la commande
          this.panierService.message('Commande envoyée', 'success', 'Merci pour la confiance');
          // Ajoutez ici le code pour effectuer la commande
        }
      });
    }
  }


  // this.produitsPanier = this.panierService.getLegumes();
  // addPanier(legume: any) {
  //   this.panierService.ajouterAuPanier(legume);
  // }

  // retirerPanier(legume: any) {
  //   this.panierService.retirerDuPanier(legume);
  //   this.produitsPanier = this.panierService.getLegumes();
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


     // Effacer le panier après avoir passé la commande
  // envoiBd() {
  //   this.panierService.clearLegumes();
  //   this.produitsPanier = [];
  // }

}
