import { Component } from '@angular/core';
import { Panier } from 'src/app/models/login';
import { PanierService } from 'src/app/services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { HeaderComponent } from '../header/header.component';
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


  public quantite = 1;
  public nbpanier=0;
  public panier: any = [];
  public nombreLegumes = 0;
  public sommeLegumes = 0;
  public prixLivraion = this.panierService.prixLivraion;

  produitsPanier: any[] = [];

  constructor(private panierService: PanierService,private LegumesService:LegumesService) {}
  ngOnInit(): void {
    this.listerDesProduits();
    this.produitsPanier = this.panierService.getLegumes();
    this.panier = this.panierService.getFromPanier();
    this.totalProduit();
  }

  upOrDownQuantity(type: string, id: any) {
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
           // Ajoutez cette condition pour vérifier si la quantité totale est épuisée
      if (element.produit.quantiteTotale === 0) {
        element.epuise = true; // Ajoutez une propriété "epuise" à l'élément dans le panier
      } else {
        element.epuise = false;
      }
      }
    });
    localStorage.setItem("panier", JSON.stringify(panierProduit));
    this.totalProduit();
    this.panier = this.panierService.getFromPanier();
    this.nbpanier= (panierProduit.length);
    // this.cdr.detectChanges();
    console.log('nombbre',this.nbpanier)
  }

  totalProduit() {
    this.nombreLegumes = 0;
    this.sommeLegumes = 0;
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
      this.nombreLegumes += element.quantitePanier;
      this.sommeLegumes += element.quantitePanier * element.prix;
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

  connectUser: boolean = false;

  isOnline() {
    let panier = JSON.parse(localStorage.getItem('panier') ?? '[]');
    console.log(panier.length);
    if (panier.length == 0) {

      this.panierService.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }else{
      this.panierService.isAuthenticated$.subscribe((isAuthenticated) => {
        if ( this.connectUser == isAuthenticated) {
       this.panierService.message('Oop\'s', "error", "La connexion est requise pour cette action");
      } else {
          this.panierService.message('Commande envoié', "success", "Merci pour la confiance");
        }
      });
    }
  }

  addPanier(legume: any) {
    this.panierService.ajouterAuPanier(legume);
    // this.produitsPanier = this.panierService.getLegumes();
  }

    // Fonction qui permet de faire des pointier si le texte est lon
    tronquerTexte(texte: string, longueurMax: number): string {
      if (texte.length > longueurMax) {
        return texte.substring(0, longueurMax) + '...';
      }
      return texte;
    }

    //Pour faire la recherche
    filterValue = '';
    filteredProduit: any;

   // le tableau
   tabListProduit : any []=[];

   itemsPerPage = 8;
   currentPage = 1;

   onSearch() {
    this.currentPage = 1; // Réinitialiser la page à 1 lorsqu'une recherche est effectuée

    // Recherche se fait selon le nom du produit
    this.filteredProduit = this.tabListProduit.filter((elt: any) =>
      elt?.nomProduit.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  get visibleProduits() {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return sourceArray.slice(startIndex, endIndex);
  }

  totalPagesArray(): number[] {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    return Array.from({ length: Math.ceil(sourceArray.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  setPage(page: number) {
    // Vérifiez si la page est valide en fonction du nombre total de pages
    if (page >= 1 && page <= this.totalPagesArray().length) {
      this.currentPage = page;
    }
  }


  listerDesProduits(){
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log('listeProduits', data.ListeProduit);
      this.tabListProduit = data.ListeProduit;
      // console.log('tab', this.tabListProduit);
     } ) }


}
