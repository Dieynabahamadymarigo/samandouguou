import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

    // choix formulaire
    titleFrm:string="";

    // Déclaration du tableau des utilisaturs pour s'inscrire

    user: User = new User();

    // Déclarations des attributs
    nom : string  =  "";
    prenom : string = "";
    email : string = "";
    password : string = "";
    adresse : string = "";
    telephone : string = "";
    image : any = "";
    existEmail : string = "";
    existPassword : string = "";


    // variables pour se connecter
    formDate:any = {
      email : '',
      password : '',
      createAt: new Date(),
      updateAt: "",
    }

    formDateExiste:any = {
      emailExiste : '',
      passwordvExiste : '',
      createAt: new Date(),
      updateAt: "",
    }
    // variable pour gérer la déconnexion
    connectUser: boolean = false;
    userName: string = '';
    userClient: any [] = [];

    constructor (private router: Router, private authService : LoginService){}

    ngOnInit(): void {
         // S'abonner aux observables pour mettre à jour les propriétés du composant en fonction de l'état d'authentification
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.connectUser = isAuthenticated;
    });

    this.authService.userName$.subscribe((userName) => {
      this.userName = userName;
    });

    this.authService.user$.subscribe((user) => {
      this.userClient = user;
      // console.log('userNgonit',user)
    });

      // this.afficherFrmConnexion();
      this.onLoginClick();
    // this.formDate()
    }

        // Méthode pour afficher un sweetalert2 apres vérification
   verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }



    //methode pour se connecter
  onSubmit() : void{

      console.log("merci", this.formDate)
      this.authService.connection(this.formDate).subscribe(
        (rep)=>{
        // console.log('le nom client',rep.user)
        let userClient = rep.user;
        // console.log('userClient', userClient);
        localStorage.setItem('userConnect',rep.token)
        console.log('user',rep.token)
          // Utilisez la réponse pour obtenir le nom d'utilisateur
          let userName = rep.user.nom;
          // Émettez le nom d'utilisateur à travers l'observable userName$
          this.authService.userNameSubject.next(userName);
          this.authService.userSubject.next(userClient);
          // console.log('réussi',rep)
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

    // if (!this.formDate.email || !this.formDate.password ) {
    //   this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
    //   }
    //   else {
    //     this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
    //   }

      // if (!this.formDate.email || !this.formDate.password ) {
      //   this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
      //   }
      //  else {
      //   if (this.formDate.email != this.formDateExiste.emailExiste || this.formDate.password != this.formDateExiste.passwordvExiste){
      //     this.verifierChamps('Email ou mot de passe incorrect', 'Veuillez saisir le bon email ou mot de passe', 'error');}
      //     else{
      //       this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
      //     }
      //   }
      // this.onSubmit();
    this.viderChamps();

  }

  onLoginClick() {
    if (this.connectUser) {
      // Gérer la déconnexion
      this.authService.deconnect().subscribe(() => {
        this.router.navigate(['/']);
        // alert ('deconnecter')
        console.log('deconnectdgddgg',this.connectUser)
      });
    }
  }
    // inserer l'image
    getFile(event: any) {
      console.log('img',this.image)
      console.warn(event.target.files[0]);
      this.image = event.target.files[0] as File;
    }

    //methode pour inscription client
    onInscrire() : void{
      let formData = new FormData();
      formData.append("nom", this.nom);
      formData.append("prenom", this.prenom);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("adresse", this.adresse);
      formData.append("telephone", this.telephone);
      formData.append("image", this.image);
      console.log('bjr',formData)

      this.authService.inscritClient(formData).subscribe(
        (rep)=>{
          console.log('réussi',rep)
        },
      (error) => {
        console.error('erreur',error);
      }
      );

      if (this.nom=="" && this.prenom=="" && this.email=="" && this.password=="" && this.adresse=="" && this.telephone=="" && this.image == "" ) {
      this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
      }
       else {
        this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
      }
      this.viderChamps();
    }

  // Methode pour vider les champs
  viderChamps(){
    // On vide les valeurs des champs input
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
    this.adresse = "";
    this.telephone = "";
    this.image = "";
    this.formDate = "";
  }

  // methode pour inscrire livreur





    // choix formulaire
showFrmConnexion: boolean=true;

afficherFrmConnexion(){
  this.showFrmConnexion=!this.showFrmConnexion;

  // Opération ternaire qui prend la premiere valeur après le ? si la condition est vrai
  // ou la deuxième après les : si la condition est fausse
  this.showFrmConnexion == false ?  this.titleFrm="" :  this.titleFrm="";
}

}
