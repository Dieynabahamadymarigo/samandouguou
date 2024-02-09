import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-headerclient',
  templateUrl: './headerclient.component.html',
  styleUrls: ['./headerclient.component.css']
})
export class HeaderclientComponent {

  //
  // nom:string="";
  // prennom:string="";

     // variable pour gérer la déconnexion
     connectUser: boolean = false;
     userName: string = "" ;
     userClient: any =[] ;
     constructor (private router: Router, private authService : LoginService){}

     ngOnInit(): void {
          // S'abonner aux observables pour mettre à jour les propriétés du composant en fonction de l'état d'authentification
     this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
       this.connectUser = isAuthenticated;
     });

     this.authService.userName$.subscribe((userName) => {
       this.userName = userName;
       console.log('nom :', userName)
      });

      this.authService.user$.subscribe((user) => {
      this.userClient = user;
      console.log('prenom :', user)
    });

     }

    //  onLoginClick() {
    //    if (this.connectUser) {
    //      // Gérer la déconnexion
    //      this.authService.deconnect().subscribe(() => {
    //        this.router.navigate(['/']);
    //        alert ('deconnecter')
    //      });
    //     } else {}
    //  }


    user: User = new User();

    // variables pour se connecter
    formDate:any = {
      email : '',
      password : '',
      createAt: new Date(),
      updateAt: "",
    }

        //methode pour se connecter
  onSubmit() : void{

    console.log("merci", this.formDate)
    this.authService.connection(this.formDate).subscribe(
      (rep)=>{
        console.log('le nom client',rep.user)
        let userClient = rep.user;
        console.log('user', userClient);
        localStorage.setItem('userConnect',rep.token)
          // Utilisez la réponse pour obtenir le nom d'utilisateur
          let userName = rep.user.nom;
          // Émettez le nom d'utilisateur à travers l'observable userName$
          this.authService.userNameSubject.next(userName);
          this.authService.userSubject.next(userClient);
          // console.log('nom',userName)
        if(rep.user.role_id=='1'){
          this.router.navigate(['/admin']);
          alert('voux etes admin')
        }
        else if (rep.user.role_id=='2')
        {
          this.router.navigate(['/client']);
          alert('voux etes client')
        }
        else
        {
          this.router.navigate(['']);
        alert('voux etes livreur')
      }
     },
    // (error) => {
    //   console.error('erreur',error);
    // }
    );

    if (this.formDate=='' ) {
      this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
      }
     else {
          this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
      }
  this.viderChamps();

}


            // Méthode pour afficher un sweetalert2 apres vérification
   verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

    // Methode pour vider les champs
    viderChamps(){
      // On vide les valeurs des champs input
      this.formDate = "";
    }

}
