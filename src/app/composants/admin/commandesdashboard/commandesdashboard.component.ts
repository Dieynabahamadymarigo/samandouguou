import { Component } from '@angular/core';
import { CommandeService } from 'src/app/services/commande/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commandesdashboard',
  templateUrl: './commandesdashboard.component.html',
  styleUrls: ['./commandesdashboard.component.css']
})
export class CommandesdashboardComponent {
    // variables choix de transactions
    tabEnCours : boolean = true;
    tabConfirmer : boolean = false;
    tabRecues : boolean = false;
    tabAnnuler : boolean = false;

    //choix de transactions pour tableau en cours
    afficheLoading(){
    this.tabEnCours = true;
    this.tabConfirmer = false;
    this.tabRecues = false;
    this.tabAnnuler = false;
    }

    //choix de transactions pour tableau confirmer
    afficheConfirm(){
    this.tabEnCours = false;
    this.tabConfirmer = true;
    this.tabRecues = false;
    this.tabAnnuler = false;
    }

    //choix de transactions pour tableau recevoir
    afficheReceveid(){
    this.tabEnCours = false;
    this.tabConfirmer = false;
    this.tabRecues = true;
    this.tabAnnuler = false;
    }

    //choix de transactions pour tableau annuler
    afficheClose(){
      this.tabEnCours = false;
      this.tabConfirmer = false;
      this.tabRecues = false;
      this.tabAnnuler = true;
      }

  commandes: any[] = [];
  nomCommande: any = '';
  quantite: any = '';
  produit: any = '';
  creatAt = '';
  updateAt = '';

      constructor(private commandeService: CommandeService) {}

      ngOnInit(): void {}


  //methode pour ajouter des commandes
  ajout(): void {
    {
      let formData = new FormData();
      formData.append('nomCommande', this.nomCommande);
      formData.append('quantite', this.quantite);
      formData.append('produit', this.produit);
      console.log('commande', formData);

      this.commandeService.submitCommande().subscribe(
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
    this.ajout();
  }


  viderChamps() {
    this.nomCommande = '';
    this.quantite = '';
    this.produit = '';
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

      // listeCommnadeClient(){
      //   this.commandeService.submitCommande().subscribe((data) => {
      //     console.log('listeProduits', data);

      //       // this.orders = rep;
      //     },
      //     (error) => {
      //       console.error('Erreur lors de la récupération des commandes pour l\'administration :', error);
      //     }
      //   );
      // }


}
