import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'profilclient',
  templateUrl: './profilclient.component.html',
  styleUrls: ['./profilclient.component.css']
})
export class ProfilclientComponent {

  // constructor (private router: Router, private authService : LoginService){}
      // variable pour gérer la déconnexion
      connectUser: boolean = false;
      userName: string = '';
      userRole: string = '';
      userClient: any = [];

      // le survol du profil
      showDropdown: boolean = false;


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

      this.authService.user$.subscribe((user) => {
        this.userClient = user;
      });

      // this.userClient = this.userClient

    }

      // variables pour se connecter
      formDate:any = {
        email : '',
        password : '',
        created_At: '',
        updateAt: "",
      }

  //methode pour se connecter
  onSubmit() : void{

    console.log("merci", this.formDate)
    this.authService.connection(this.formDate).subscribe(
      (rep)=>{
      console.log('le nom client',rep.user)
      let userClient = rep.user;
      console.log('userClient', userClient)
      localStorage.setItem('userConnect',rep.token)
        // Utilisez la réponse pour obtenir le nom d'utilisateur
        let userName = rep.user.nom;
        // Émettez le nom d'utilisateur à travers l'observable userName$
        this.authService.userNameSubject.next(userName);
        console.log('réussi',rep)
        // localStorage.setItem('userConnect',rep.token)
        if(rep.user.role_id=='1'){
          this.router.navigate(['/admin']);
          // alert('voux etes admin')
        }
        else if (rep.user.role_id=='2')
        {
          this.router.navigate(['/client']);
          // alert('voux etes client')
        }
        else
        {
          this.router.navigate(['']);
        // alert('voux etes livreur')
      }

    },
    );
  this.viderChamps();

  }

    // Methode pour vider les champs
    viderChamps(){
      // On vide les valeurs des champs input
      this.formDate = "";
    }

}
