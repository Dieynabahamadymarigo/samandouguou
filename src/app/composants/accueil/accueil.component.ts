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
  produit: any[];

  ngOnInit(): void {
    this.listerDesProduits();
    console.log(this.produit)
    console.log(this.produits)


  }

   produitLegumes: any[] = [];

  // mettre à jour le produit
   updateCartInLocalStorage() {
    localStorage.setItem('produits', JSON.stringify(this.produitLegumes));
  }

  constructor(private panierService: PanierService,private LegumesService:LegumesService,private router: Router,) {
    this.produit = this.panierService.getLegumes();
    const stockerproduitLegumes = localStorage.getItem('legume');
    this.produitLegumes = stockerproduitLegumes ? JSON.parse(stockerproduitLegumes) : [];
  }

  addPanier(legume: any) {
    this.produitLegumes.push(legume);
    this.router.navigate(['/panier']);
    this.updateCartInLocalStorage();
  }


  retirerPanier(legume: any) {
    this.panierService.retirerDuPanier(legume);
  }


  envoiBd() {
    // Effacer le panier après avoir passé la commande
    this.panierService.clearLegumes();
    this.produit = [];
  }

   // le tableau
   tabListProduit : any []=[];

  listerDesProduits(){
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log("listeProduits", data.listeProduits);
    this.tabListProduit = data.listeProduits;
  //  console.log(this.tabListProduit);
     } ) }


}
