import Swal from 'sweetalert2';
import { Produits } from './../../../models/login';
import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login/login.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // variables pour les noms des variables
  produits: Produits = new Produits();

  nomProduit: string = '';
  prix: string = '';
  quantiteTotale: string = '';
  description: string = '';
  image: any = '';
  categorieProduit: string[] =  [];
  creatAt = '';
  updateAt = '';

  // le tableau
  tabListProduit: any[] = [];

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

  constructor(
    private authService: LegumesService,
    private LegumesService: LegumesService
  ) {}

  // inserer l'image
  getFile(event: any) {
    console.log('img', this.image);
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  ngOnInit(): void {
    this.listerDesProduits();
    // this.filteredProduit=this.tabListProduit
    // this.modifierProduit();
    // this.ajout();
  }

  //methode pour ajouter des prduits
  ajout(): void {
    {
      let formData = new FormData();
      formData.append('nomProduit', this.nomProduit);
      formData.append('prix', this.prix);
      formData.append('quantiteTotale', this.quantiteTotale);
      formData.append('description', this.description);
      formData.append('image', this.image);
      console.log('produit', formData);

      this.authService.ajoutProduit(formData).subscribe(
        (rep) => {
          console.log('réussi', rep);
          localStorage.setItem('userConnect', rep.token);
        },
        (error) => {
          console.error('erreur', error);
        }
      );
    }
    this.verifierChamps('Félicitation!', 'Produit ajouté', 'success');

    this.viderChamps();
  }

  /** fonction pour lister les produits */



  // lister  produits
  listerDesProduits() {
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log('listeProduits', data.ListeProduit);
      this.tabListProduit = data.ListeProduit;
      console.log('tab', this.tabListProduit);
    });
  }

  // categorie_id: this.categorie_id,

  //  pour recuperer un produit
  produitSelectionner: any = {};

  getProduit(produit: any) {
    this.produitSelectionner = produit;
  }

  // fonction pour modifier
  //  variable
  // modifProduit: any;

  modifierProduit() {
    let formData = new FormData();
      formData.append('nomProduit', this.nomProduit,);
      formData.append('prix', this.prix,);
      formData.append('quantiteTotale', this.quantiteTotale,);
      formData.append('image', this.image,);
      formData.append('description', this.description,);
    this.authService.updateProduit(this.id, formData).subscribe((response) => {
        console.log('modifProduit', response);
      });
  }
  // declare id
  id: number = 0;
  chargerInfosProduit(produit: any) {
    console.log(produit);
    this.id = produit.id;
    console.warn('lid de marigo', this.id);
    this.nomProduit = produit.nomProduit;
    this.prix = produit.prix;
    this.quantiteTotale = produit.quantiteTotale;
    this.description = produit.description;
    this.image = produit.image;
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


  // Pagination
     // Attribut pour la pagination
    //  itemsParPage = 3;
     // Nombre d'articles par page
    //  pageActuelle = 1;
      // Page actuelle
    //  tabMessages: any[] = [];
    //  tabMessagesFilter: any[] = [];
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  //   getItemsPage(): any[] {
  //     console.log('pagi',this.getItemsPage)
  //     if (Array.isArray(this.tabMessagesFilter)) {
  //     const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
  //     const indexFin = indexDebut + this.itemsParPage;
  //     return this.tabMessagesFilter.slice(indexDebut, indexFin);
  //   } else {
  //     return [];
  //   }
  // }

  // Méthode pour générer la liste des pages
  // get pages(): number[] {
  //   const totalPages = Math.ceil(this.tabMessagesFilter.length / this.itemsParPage);
  //   return Array(totalPages).fill(0).map((_, index) => index + 1);
  // }

  // Méthode pour obtenir le nombre total de pages
  // get totalPages(): number {
  //   return Math.ceil(this.tabMessagesFilter.length / this.itemsParPage);
  // }

  // Methode pour vider les champs
  viderChamps() {
    this.nomProduit = '';
    this.prix = '';
    this.quantiteTotale = '';
    this.description = '';
    this.image = '';
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

// bienSelectionner:any = "";
// console.log(this.bienSelectionner);
// console.log(data)

// this.getAllBiens();
