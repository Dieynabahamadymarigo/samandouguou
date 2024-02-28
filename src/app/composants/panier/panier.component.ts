import { GuardService } from './../../services/guard/guard.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Panier } from 'src/app/models/login';
import { PanierService } from 'src/app/services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { LoginService } from 'src/app/services/login/login.service';
import { CommandeService } from 'src/app/services/commande/commande.service';
import Swal from 'sweetalert2';

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
  total: number= 0;

  public quantite = 1;
  public nbpanier=0;
  public panier: any = [];
  public nombreLegumes = 0;
  public sommeLegumes = 0;
  public prixLivraion = this.panierService.prixLivraion;

  tabListProduit: any[] = [];

  //
  connectUser: boolean = false;
  userClient: any= [];


  constructor(private authService : LoginService, private router: Router, private panierService: PanierService,private LegumesService:LegumesService,  private cdr: ChangeDetectorRef, private commande: CommandeService) {}
  ngOnInit(): void {

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.connectUser = isAuthenticated;
    });

    this.listerDesProduits();
    // this.produitsPanier = this.panierService.getLegumes();
    this.panier = this.panierService.getFromPanier();
    this.totalProduit();

    // this.isOnline();
  }


  // Validation input panier
  isPanierValid:boolean = true;
  messagePanier: string = "";
  validerInputPanier(inputPanier:any, id: any){
    const panierRegex = /^[1-9]{1,}$/;
    let validInput = panierRegex.test(inputPanier);  // Retourne vrai si l'input est un number positif non null
    // alert(panierRegex.test(inputPanier));
    // if(parseInt(inputPanier) < 0){
    //   this.isPanierValid = false;
    //   this.messagePanier =  "Ne prend que des valeurs positives";
    // }

    if (validInput) {
      this.isPanierValid = true;
      this.messagePanier =  "";
      let panierProduit = this.panierService.getFromPanier();
      panierProduit.forEach((element: any) => {
        // console.log('ajout', panierProduit)
        if (element.produit.id == id) {
          element.quantitePanier = inputPanier;
        }
        // console.log('increment',this.upOrDownQuantity)
      });
      localStorage.setItem("panier", JSON.stringify(panierProduit));
      this.totalProduit();
    } else {
      this.isPanierValid = false;
      this.messagePanier =  "Ne prend que des valeurs positives";
    }
    // console.log(this.isPanierValid);
    // console.log(this.messagePanier);

    //  const panierRegex = /^[1-9]/;
    //  let test = panierRegex.test(inputPanier);

    //  if(panierRegex.test(inputPanier)) {
    //   this.isPanierValid = true;
    //   this.messagePanier =  "";
    //  }  else {
    //   this.isPanierValid = false;
    //   this.messagePanier =  "Ne prend que des valeurs positives";
    //  }
  }

  // incrémente
  upOrDownQuantity(type: string, id: any) {
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
      // console.log('ajout', panierProduit)
      if (element.produit.id == id) {
        if (type == 'up') {
          // this.quantite++;
          element.quantitePanier++;
          if (element.quantitePanier>element.produit.quantiteTotale) {
            element.quantitePanier--;
            this.panierService.message("Oops","warning",`il n'en reste que ${element.produit.quantiteTotale} produits en stock`);
          }
        } else {
          // this.quantite--;
          element.quantitePanier--;
          if (element.quantitePanier < 1) {
            element.quantitePanier = 1;
          }
        }
      }
      // Ajoutez cette condition pour vérifier si la quantité totale est épuisée
      if (element.produit.quantiteTotale === 0) {
        element.epuise = true; // Ajoutez une propriété "epuise" à l'élément dans le panier
      } else {
        element.epuise = false;
      }
      // console.log('increment',this.upOrDownQuantity)
    });
    localStorage.setItem("panier", JSON.stringify(panierProduit));
    this.totalProduit();
    this.panier = this.panierService.getFromPanier();
  }

// total dess produits
  totalProduit() {
    // alert(this.isPanierValid);
    this.nombreLegumes = 0;
    this.sommeLegumes = 0;
    let panierProduit = this.panierService.getFromPanier();
    panierProduit.forEach((element: any) => {
      this.nombreLegumes += element.quantitePanier;
      this.sommeLegumes += element.quantitePanier * element.produit.prix;
      // if(element.quantitePanier > 0) {
      // }
    });
    // console.log('total',this.totalProduit),
  }

  // methode supprimer produit api
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

  // methode pour supprimer produit localStorage
  supprimerLegume(paramLegume:any){
     let tabLegume: any = [];
        alert(paramLegume.etatLegume)
        tabLegume = this.panierService.getFromPanier();
        console.log('arqa',tabLegume)
        console.log('sup',paramLegume)
        console.log(paramLegume.idLegume)
        tabLegume.splice(paramLegume.idLegume-2, 1)

        localStorage.setItem("panier", JSON.stringify(this.panier));
        this.panierService.message("Parfait", "success", "produit retiré vcfdt du panier");

      }

  // vider panier
  deleteAllPanier() {
    let tab: any = [];
    tab = this.panierService.getFromPanier();

    // Vider le tableau
    tab = [];

    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.panierService.getFromPanier();
    this.panierService.message("Parfait", "success", "Panier vidé avec succès");
    this.totalProduit();
  }

  // aprés commande vider le panier
  commandeAllPanier() {
    let tab: any = [];
    tab = this.panierService.getFromPanier();
    // Vider le tableau
    tab = [];

    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.panierService.getFromPanier();
    // this.panierService.message("Parfait", "success", "Panier vidé avec succès");
    this.totalProduit();
  }

      // variables pour se connecter
      formDate:any = {
        email : '',
        password : '',
        createAt: new Date(),
        updateAt: "",
      }
      // idUser: number = 0;



      // variable pour adresse
      adresseLivraison: string = '';
      // Déclarez une variable loading dans votre composant
      loading: boolean = false;

  isOnline() {
    let panier = JSON.parse(localStorage.getItem('panier') ?? '[]');
    console.log('Valeur du panier dans le localStorage:', panier);

    if (panier.length == 0) {
      this.panierService.message('Oop\'s', "warning", "Le panier est vide veuillez le remplir d'abord");
    }
    else {
      Swal.fire({
        title: '😊 Veuillez patienter',
        text: 'Envoi de la commande en cours...',
        icon: 'info',
        showConfirmButton:false,
        // timer:15000,
      });
      // Afficher "Veuillez patienter"
    // this.verifierChamps('😊 Veuillez patienter', 'Envoi de la commande en cours...', 'info');

      this.panierService.isAuthenticated$.subscribe((isAuthenticated) => {
        if (this.connectUser == isAuthenticated) {
          console.log(this.connectUser);
          this.panierService.message('Oop\'s', 'error', 'La connexion est requise pour cette action');
          // this.router.navigate(['/connexion']);
        }
        else {

          let panierProduitUser: any[] = [];
          panier.forEach((element: any) => {
            panierProduitUser.push({
              produit_id: element.produit.id,
              nombre_produit: element.quantitePanier,
              montant: element.produit.prix * element.quantitePanier,
              });
          });

          let panierToSend = {
            panier: panierProduitUser,
            adresse_de_livraison: this.adresseLivraison,
          };

          console.log('panierSend', panierToSend);

          // Mettez à jour la variable de chargement
          this.loading = true;

          this.commande.submitCommande(panierToSend).subscribe(
            (rep) => {
              // Mettez à jour le panier local et affichez le message de confirmation ici
              this.panierService.message('Commande envoyée', 'success', 'Merci pour la confiance');
              this.commandeAllPanier();
              this.viderChamps();
            },
            (erreur: any) => {
              console.error("Erreur lors de la requête HTTP :", erreur);
            },
            ()=>{
             // Mettez à jour la variable de chargement après l'achèvement de la requête
            this.loading = false
            }
          );
        }
      });
    };
  }


    //  pour recuperer un produit
    produitSelectionner: any = {};

    getProduit(produit: any) {
      this.produitSelectionner = produit;
    }

   // le tableau
  listerDesProduits(){
    this.LegumesService.listerDesProduits().subscribe((data) => {
    // console.log("listeProduits", data.ListeProduit);
    this.tabListProduit = data.ListeProduit;
     } ) }

    // Méthode pour afficher un sweetalert2 apres vérification
    verifierChamps(title:any, text:any, icon:any) {
      Swal.fire({
        title: title,
        text: text,
        icon: icon
      });
    // Ferme le pop-up après 2 secondes
    // setTimeout(() => {
    //   Swal.close();
    // }, 1500);
    }

    // Methode pour vider les champs
    viderChamps(){
      this.adresseLivraison="";
    }
}
