import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-headerclient',
  templateUrl: './headerclient.component.html',
  styleUrls: ['./headerclient.component.css']
})
export class HeaderclientComponent {

  //
  nom:string="";
  prennom:string="";

     // variable pour gérer la déconnexion
     connectUser: boolean = false;
     userName: string = '';
     constructor (private router: Router, private authService : LoginService){}

     ngOnInit(): void {
          // S'abonner aux observables pour mettre à jour les propriétés du composant en fonction de l'état d'authentification
     this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
       this.connectUser = isAuthenticated;
     });

     this.authService.userName$.subscribe((userName) => {
       this.userName = userName;
     });
     }

     onLoginClick() {
       if (this.connectUser) {
         // Gérer la déconnexion
         this.authService.deconnect().subscribe(() => {
           this.router.navigate(['/']);
           alert ('deconnecter')
         });
       } else {}
     }

}
