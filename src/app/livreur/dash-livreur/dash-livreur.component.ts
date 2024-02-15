import { CommandeService } from 'src/app/services/commande/commande.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dash-livreur',
  templateUrl: './dash-livreur.component.html',
  styleUrls: ['./dash-livreur.component.css']
})
export class DashLivreurComponent {

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


