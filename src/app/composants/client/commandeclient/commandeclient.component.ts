import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LegumesService } from 'src/app/services/legumes/legumes.service';

@Component({
  selector: 'app-commandeclient',
  templateUrl: './commandeclient.component.html',
  styleUrls: ['./commandeclient.component.css']
})
export class CommandeclientComponent {


  constructor(
    private authService: LegumesService,private LegumesService: LegumesService) {}
    // variables choix de produits
    tabProduits: boolean = true;
    tabPacks: boolean = false;
    tabClients: boolean = false;

    //choix de produits pour tableau produits
    afficheProduits() {
      this.tabProduits = true;
      this.tabPacks = false;
      this.tabClients = false;
    }

    //choix de produits pour tableau packs
    affichePacks() {
      this.tabProduits = false;
      this.tabPacks = true;
      this.tabClients = false;
    }

    //choix de produits pour tableau clients
    afficheClients() {
      this.tabProduits = false;
      this.tabPacks = false;
      this.tabClients = true;
    }

  tabListProduit: any[] = [];

   //  pour recuperer un produit
   produitSelectionner: any = {};

   getProduit(produit: any) {
     this.produitSelectionner = produit;
   }

   modifierProduit() {
     let formData = new FormData();
      //  formData.append('nomProduit', this.nomProduit,);
      //  formData.append('prix', this.prix,);
      //  formData.append('quantiteTotale', this.quantiteTotale,);
      //  formData.append('image', this.image,);
      //  formData.append('description', this.description,);
     this.authService.updateProduit(this.id, formData).subscribe((response) => {
         console.log('modifProduit', response);
       });
   }
   // declare id
   id: number = 0;
   chargerInfosProduit(produit: any) {
     console.log(produit);
     this.id = produit.id;
    //  console.warn('lid de marigo', this.id);
    //  this.nomProduit = produit.nomProduit;
    //  this.prix = produit.prix;
    //  this.quantiteTotale = produit.quantiteTotale;
    //  this.description = produit.description;
    //  this.image = produit.image;
     console.log('changer', this.chargerInfosProduit);
   }

   // methode pour supprimer

supprimerProduit(id:number){

  Swal.fire({
    title: "Etes-vous sur???",
    text: "Vous allez supprimer le produit",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1A6060",
    cancelButtonColor: "#2FA7A7",
    confirmButtonText: "Oui, je supprime!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.deleteProduit(id).subscribe((response) => {
        console.log('supProduit', response);
      });
    }
  });
}


  //Pour faire la recherche
  filterValue = '';
  filteredProduit: any;

  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.filteredProduit = this.tabListProduit.filter((elt: any) =>
      elt?.nomProduit.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  itemsPerPage = 6;
  currentPage = 1;

  get visibleProduits() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tabListProduit.slice(startIndex, endIndex);
  }

  totalPagesArray(): number[] {
   return Array.from({ length: Math.ceil(this.tabListProduit.length / this.itemsPerPage) }, (_, i) => i + 1);
 }

 setPage(page: number) {
   if (page >= 1 && page <= Math.ceil(this.tabListProduit.length / this.itemsPerPage)) {
     this.currentPage = page;
   }
 }


  viderChamps() {
    // this.nomProduit = '';
    // this.prix = '';
    // this.quantiteTotale = '';
    // this.description = '';
    // this.image = '';
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

}
