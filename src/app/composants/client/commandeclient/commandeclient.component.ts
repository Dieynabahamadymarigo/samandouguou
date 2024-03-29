import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { CommandeService } from 'src/app/services/commande/commande.service';
import { Commande } from 'src/app/models/login';

@Component({
  selector: 'commandeclient',
  templateUrl: './commandeclient.component.html',
  styleUrls: ['./commandeclient.component.css']
})
export class CommandeclientComponent implements OnInit {


  constructor(private legumesService: LegumesService, private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.listeCommandeUser();
  }
    // variables choix de produits
    tabCommandeTerminee: boolean = true;
    tabPCommandeEnCours: boolean = false;
    tabClients: boolean = false;

    //choix de produits pour tableau produits
    afficheCommandeTerminee() {
      this.tabCommandeTerminee = true;
      this.tabPCommandeEnCours = false;
      this.tabClients = false;
    }

    //choix de produits pour tableau packs
    afficheCommandeEnCours() {
      this.tabCommandeTerminee = false;
      this.tabPCommandeEnCours = true;
      this.tabClients = false;
    }

    //choix de produits pour tableau clients
    afficheClients() {
      this.tabCommandeTerminee = false;
      this.tabPCommandeEnCours = false;
      this.tabClients = true;
    }

  tabListProduit: any[] = [];

   //  pour recuperer un produit
   produitSelectionner: any = {};

   getProduit(produit: any) {
     this.produitSelectionner = produit;
   }


     // lister commandes d'un user
  tabListCommande: any = [];

  listeCommandeUser() {
    console.log('agezefyvdbfegvu',this.tabListCommande);
    this.commandeService.listerCommandeUser().subscribe((data) => {
      this.tabListCommande = data.listerCommande;
      console.log('tabListCommande', data.listerCommande);

    });
  }

   modifierProduit() {
     let formData = new FormData();
      //  formData.append('nomProduit', this.nomProduit,);
      //  formData.append('prix', this.prix,);
      //  formData.append('quantiteTotale', this.quantiteTotale,);
      //  formData.append('image', this.image,);
      //  formData.append('description', this.description,);
     this.legumesService.updateProduit(this.id, formData).subscribe((response) => {
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
      this.legumesService.deleteProduit(id).subscribe((response) => {
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
