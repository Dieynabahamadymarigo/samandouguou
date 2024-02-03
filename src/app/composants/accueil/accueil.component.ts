import { Component } from '@angular/core';
import { Panier } from 'src/app/models/login';
import { PanierService } from 'src/app/services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  produits: Panier = new Panier();
  nom: string = "";
  prenom: string = "";
  image: string = "";
  // produit: any[];


  // produits: Panier = new Panier();
  // nom: string = "";
  // prix:number =0;
  // image: string = "";
  // // quantite: number= 0;
  // total: number= 0;

  public quantite = 1;
  public panier: any = [];
  public nombreLegumes = 0;
  public sommeLegumes = 0;
  public prixLivraion = this.panierService.prixLivraion;
  // produit: any[];

  // tabListProduit: any[] = [];
  produitsPanier: any[] = [];

  constructor(private panierService: PanierService,private LegumesService:LegumesService) {}
  ngOnInit(): void {
    this.listerDesProduits();
    this.produitsPanier = this.panierService.getLegumes();
    this.panier = this.panierService.getFromPanier();
    this.totalProduit();
  }

  upOrDownQuantity(type: string, id: any) {
    // if (this.quantite<1) {
    //   this.quantite=1;
    // }
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
      if (element.produit.id == id) {
        if (type == 'up') {
          // this.quantite++;
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
    });
    localStorage.setItem("panier", JSON.stringify(panierProduit));
    this.totalProduit();
    this.panier = this.panierService.getFromPanier();
  }

  totalProduit() {
    this.nombreLegumes = 0;
    this.sommeLegumes = 0;
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
      this.nombreLegumes += element.quantitePanier;
      this.sommeLegumes += element.quantitePanier * element.produit.prix;
    });

  }

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

  isOnline() {
    let a = JSON.parse(localStorage.getItem('panier') ?? '[]');
    // console.log(a.length);
    if (a.length == 0) {

      this.panierService.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }else{

      if (this.panierService.IsOnline()) {
        // this.router.navigate(['/confirmCommand']);
      } else {
        this.panierService.message('Oop\'s', "error", "La connexion est requise pour cette action");
      }
    }
  }

  addPanier(legume: any) {
    this.panierService.ajouterAuPanier(legume);
    // this.produitsPanier = this.panierService.getLegumes();
  }
 




   // le tableau
   tabListProduit : any []=[];

  listerDesProduits(){
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log('listeProduits', data.ListeProduit);
      this.tabListProduit = data.ListeProduit;
      // console.log('tab', this.tabListProduit);
     } ) }


}
