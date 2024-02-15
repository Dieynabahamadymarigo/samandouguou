import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-headerdashboard',
  templateUrl: './headerdashboard.component.html',
  styleUrls: ['./headerdashboard.component.css']
})
export class HeaderdashboardComponent {
   // variable pour gérer la déconnexion
   connectUser: any;
   deconnectUser:any;
   userName: string = '';
   constructor (private router: Router, private authService : LoginService){}

   ngOnInit(): void {

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

}
