import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';

@Component({
  selector: 'app-card-pagination',
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.css']
})
export class CardPaginationComponent implements OnInit {

  constructor(private panierService: PanierService,private LegumesService:LegumesService) {}

  ngOnInit() {
    this.listerDesProduits();
    this.totalProduit();
  }
  
  public nombreLegumes = 0;
  public sommeLegumes = 0;
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

  listerDesProduits(){
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log('listeProduits', data.ListeProduit);
      this.tabListProduit = data.ListeProduit;
      // console.log('tab', this.tabListProduit);
     } ) }

  // addPanier(legume: any) {
  //   this.panierService.ajouterAuPanier(legume);
    // this.produitsPanier = this.panierService.getLegumes();
  // }

  addPanier() {
    this.tabListProduit.forEach((legume) => {
        this.panierService.ajouterAuPanier(legume);
    });

    // Rafraîchir la liste des produits dans le panier (si nécessaire)
    // this.panier = this.panierService.getLegumes();
}

  // methode supprimer
  public panier: any = [];

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

}


