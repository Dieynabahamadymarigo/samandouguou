import { Component, OnInit } from '@angular/core';
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
  quantite: number= 0;
  total: number= 0;
  // produit: any[];

  tabListProduit: any[] = [];
  produitsPanier: any[] = [];

  constructor(private panierService: PanierService,private LegumesService:LegumesService) {}
  ngOnInit(): void {
    this.listerDesProduits();
    this.produitsPanier = this.panierService.getLegumes();
  }


  addPanier(legume: any) {
    this.panierService.ajouterAuPanier(legume);
    this.produitsPanier = this.panierService.getLegumes();
  }

  retirerPanier(legume: any) {
    this.panierService.retirerDuPanier(legume);
    this.produitsPanier = this.panierService.getLegumes();
  }



   // le tableau
  listerDesProduits(){
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log("listeProduits", data.listeProduits);
    this.tabListProduit = data.listeProduits;
     } ) }

  envoiBd() {
    // Effacer le panier après avoir passé la commande
    this.panierService.clearLegumes();
    this.produitsPanier = [];
  }

}
