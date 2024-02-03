import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //
  // quantitePanier: any ;


      // variable pour gérer la déconnexion
      connectUser: boolean = false;
      userName: string = '';
      constructor (private router: Router,private panierService : PanierService , private authService : LoginService){}

      ngOnInit(): void {
           // S'abonner aux observables pour mettre à jour les propriétés du composant en fonction de l'état d'authentification
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        this.connectUser = isAuthenticated;
        // this.quantitePanier = this.panierService.ajouterAuPanier(this);
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
