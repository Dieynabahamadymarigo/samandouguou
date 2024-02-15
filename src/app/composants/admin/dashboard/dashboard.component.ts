import Swal from 'sweetalert2';
import { Produits, User } from './../../../models/login';
import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login/login.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  // variables pour les noms des produits
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
  tabListUser: any[] = [];

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
    this.listerUsers();
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
          // console.log('réussi',formData )
          // console.log('prix', rep.this.prix);
          // console.log('quatite', rep.quantiteTotale);
          // console.log('image', this.image);
          localStorage.setItem('userConnect', rep.token);
          this.listerDesProduits();
        },
        (error) => {
          console.error('erreur', error);
        }
      );
    }
    this.verifierChamps('Félicitation!', 'Produit ajouté', 'success');

    // this.ajout();
    // this.ngOnInit();
    this.viderChamps();
  }

  // lister  produits
  listerDesProduits() {
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      // console.log('listeProduits', data.ListeProduit);
      this.tabListProduit = data.ListeProduit;
      console.log('tab', data.ListeProduit[0].nomProduit);
    });
  }


  //  pour recuperer un produit
  produitSelectionner: any = {};

  getProduit(produit: any) {
    this.produitSelectionner = produit;
  }
  //  pour recuperer un produit
  userSelectionner: any = {};

  getUser(user: any) {
    this.userSelectionner = user;
  }

  modifierProduit() {
    let formData = new FormData();
      formData.append('nomProduit', this.nomProduit,);
      formData.append('prix', this.prix,);
      formData.append('quantiteTotale', this.quantiteTotale,);
      formData.append('image', this.image,);
      formData.append('description', this.description,);
    this.authService.updateProduit(this.id, formData).subscribe((response) => {
        console.log('modifProduit', response);
        this.listerDesProduits();

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
    this.listerDesProduits();

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
          this.listerDesProduits();

        });
      }
    });
}

  // lister  des clients
  listerUsers() {
    // console.log(this.tabListUser);
    this.LegumesService.listerDesUsers().subscribe((data) => {
      console.log('listeDesUser', data);
      this.tabListUser = data;
      console.log('listeUser', this.tabListUser);
    });
    // console.log('user',this.listerUsers)
  }



    //Pour faire la recherche
    filterValue = '';
    filteredProduit: any;

   // le tableau
  //  tabListProduit : any []=[];

   itemsPerPage = 6;
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

  // pagination des users
  get visibleUsers() {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    // const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.tabListUser.slice(startIndex, endIndex);
  }

  totalPageArray(): number[] {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    // const tabListUser = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    return Array.from({ length: Math.ceil(this.tabListUser.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  setPages(page: number) {
    // Vérifiez si la page est valide en fonction du nombre total de pages
    if (page >= 1 && page <= this.totalPagesArray().length) {
      this.currentPage = page;
    }
  }




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

