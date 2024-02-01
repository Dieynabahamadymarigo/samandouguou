import Swal from 'sweetalert2';
import { Produits } from './../../../models/login';
import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login/login.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // variables pour les noms des variables
  produits: Produits = new Produits();

  nomProduit : string = "";
  prix : string = "";
  quantiteTotale : string = "";
  description : string = "";
  image : any = "";
  categorieProduit : string [] = [];
  creatAt="";
  updateAt="";

  // le tableau
  tabListProduit : any []=[];

  // variables choix de produits
  tabProduits : boolean = true;
  tabPacks : boolean = false;
  tabClients : boolean = false;

  //choix de produits pour tableau produits
  afficheProduits(){
  this.tabProduits = true;
  this.tabPacks = false;
  this.tabClients = false;
  }

  //choix de produits pour tableau packs
  affichePacks(){
  this.tabProduits = false;
  this.tabPacks = true;
  this.tabClients = false;
  }

  //choix de produits pour tableau clients
  afficheClients(){
  this.tabProduits = false;
  this.tabPacks = false;
  this.tabClients = true;
  }

  constructor (
    private authService : LegumesService,
    private LegumesService:LegumesService
    ){}


    // inserer l'image
    getFile(event: any) {
      console.log('img',this.image)
      console.warn(event.target.files[0]);
      this.image = event.target.files[0] as File;
    }

    //methode pour ajouter des prduits
    ajout() : void{
      {
        let formData = new FormData();
      formData.append("nomProduit", this.nomProduit);
      formData.append("prix", this.prix);
      formData.append("quantiteTotale", this.quantiteTotale);
      formData.append("description", this.description);
      formData.append("image", this.image);
      console.log('produit',formData);

      this.authService.ajoutProduit(formData).subscribe(
        (rep)=>{
          console.log('réussi',rep)
          localStorage.setItem('userConnect',rep.token)
        },
      (error) => {
        console.error('erreur',error);
      }
      );

    }
      this.verifierChamps('Félicitation!', 'Produit ajouté', 'success');

      this.viderChamps();
}


/** fonction pour lister les produits */

  ngOnInit(): void {
    this.listerDesProduits();
  }


  listerDesProduits(){
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      console.log("listeProduits", data.listeProduits);
    this.tabListProduit = data.listeProduits;
  //  console.log(this.tabListProduit);
     } ) }

         //Pour faire la recherche
    filterValue = '';
    filteredClasse: any ;

    onSearch(){
      // Recherche se fait selon le nom ou le prenom
      this.filteredClasse = this.tabListProduit.filter(
        (elt:any) => (elt?.nomClasse.toLowerCase().includes(this.filterValue.toLowerCase()))
      )
      ;

    }

      // Methode pour vider les champs
  viderChamps(){
    this.nomProduit="";
    this.prix="";
    this.quantiteTotale="";
    this.description="";
    this.image="";
  }

    // Méthode pour afficher un sweetalert2 apres vérification
   verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

}
