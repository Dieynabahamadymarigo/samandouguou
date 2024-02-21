import { CommandeService } from 'src/app/services/commande/commande.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dash-livreur',
  templateUrl: './dash-livreur.component.html',
  styleUrls: ['./dash-livreur.component.css']
})
export class DashLivreurComponent implements OnInit {

   // variables choix de produits
   tabProfil: boolean = true;
   tabCommande: boolean = false;
   tabClients: boolean = false;

   //choix de produits pour tableau produits
   afficheProfil() {
     this.tabProfil = true;
     this.tabCommande = false;
     this.tabClients = false;
   }

   //choix de produits pour tableau packs
   afficheCommande() {
     this.tabProfil = false;
     this.tabCommande = true;
     this.tabClients = false;
   }

   //choix de produits pour tableau clients
   afficheClients() {
     this.tabProfil = false;
     this.tabCommande = false;
     this.tabClients = true;
   }
       // variable pour gérer la déconnexion
       connectUser: any;
       deconnectUser:any;
       userName: string = "" ;
       userClient: any =[] ;

       constructor (private router: Router, private authService : LoginService, private commandeService :CommandeService){}

      ngOnInit(): void {

      this.authService.userName$.subscribe((userName) => {
        this.userName = userName;
        console.log('nom :', userName)
      });

      this.authService.user$.subscribe((user) => {
        this.userClient = user;
        // console.log('user :', user)
      });

      if(localStorage.getItem('userConnect')!=null){
        this.connectUser=true;
        this.deconnectUser=false;
      }
      else{
        this.connectUser=false;
        this.deconnectUser=true
      }
      this.listeCommandeUser();
      this.listeDesCommandesLivreur()
      // this.commandeUserTermine();
    }

      onLogoutClick() : void{
        this.authService.deconnect().subscribe(
          () => {
            // La déconnexion a réussi
            console.log('Déconnexion réussie');
            // this.connectUser : localStorage.removeItem('userConnect')
            // alert('deconnect')
            // La déconnexion est réussie
            localStorage.removeItem('userConnect');
            this.connectUser=false;
            this.deconnectUser=true;

          },
          (error) => {
            // Gérez les erreurs liées à la déconnexion
            console.error('Erreur lors de la déconnexion :', error);
          }
        );
      }

  // statut
statutPourLivreur: string = 'disponible';

statutLivreur(nouveauStatut: string) {
  this.statutPourLivreur = nouveauStatut;

  this.commandeService.stautLivreur({ statut: this.statutPourLivreur }).subscribe(
    response => {
      console.log('succès:', response);
      console.log('suuuuuuuu',nouveauStatut)
    },
    error => {
      console.error('erreur:', error);
    }
  );
}



  // lister commande affectees a un livreur
  tabListCommandeLivreur: any []= [];
  listeDesCommandesLivreur() {

    console.log('agezefyvdbfegvu',this.tabListCommandeLivreur);
    this.commandeService.listerCommandeAffecteLivreur().subscribe((data) => {
      this.tabListCommandeLivreur = data.data;
      console.log('tabCommande', data.data);
    });
  }

  // Fonction qui permet de faire des pointier si le texte est long
  tronquerTexte(texte: string, longueurMax: number): string {
    if (texte.length > longueurMax) {
      return texte.substring(0, longueurMax) + '...';
    }
    return texte;
  }

  //  pour recuperer une commande
  // commandeSelectionnee: any = {};

  // getUser(id: number) {
  //   this.commandeSelectionnee = id;
  //   console.log('comm',id)
  // }

tabListCommande: any = [];

// liste des commande affectée par le livreur
listeCommandeUser() {
  console.log('agezefyvdbfegvu',this.tabListCommande);
  this.commandeService.listerCommandeUser().subscribe((data) => {
    this.tabListCommande = data.listerCommande;
    console.log('tabListCommande', data.listerCommande);

  });
}


// commande terminée
commandeUserTermine(id:number) {
this.commandeService.commandeTerminer(id).subscribe((response) => {
    console.log('commandeterminé', response);
  });
}


    // statutLivreur(statut:any) {
    //   console.log('paramStatut', statut);
    //   this.commandeService.stautLivreur(statut).subscribe(
    //     response => {
    //       this.statut=statut;
    //       console.log('statutObtenuuuu',this.statut);

    //     },
    //     error => {
    //       console.error('Erreur ', error);
    //     }
    //   );
    //   }

    }


