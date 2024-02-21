import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
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
    // this.onSubmit();

      // this.afficherFrmConnexion();
      // this.onLoginClick();
    // this.formDate()
    }

    // Méthode pour afficher un sweetalert2 apres vérification
   verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  // Ferme le pop-up après 2 secondes
  setTimeout(() => {
    Swal.close();
  }, 1500);
  }

    // Variables pour faire la vérifications
    verifNom : String  =  "";
    verifPrenom : String = "";
    verifEmail : String = "";
    verifPassword : String = "";
    verifPasswordConf : String = "";
    verifAdresse : String = "";
    verifTelephone : String = "";

    // Variables si les champs sont exacts
    exactNom : boolean = false;
    exactPrenom : boolean = false;
    exactEmail : boolean = false;
    exactPassword : boolean = false;
    exactPasswordConf : boolean = false;
    exactAdresse : boolean = false;
    exactTelephone : boolean = false;

   // Variable pour la connexion
  //  emailCon : String = "";
  //  passwordCon: String = "";

   // Pour vérifier les champs pour la connexion
   verifEmailCon : String = "";
   verifPasswordCon: String = "";

   // Variables Si les valeurs sont exactes
   exactEmailCon : boolean = false;
   exactPasswordCon : boolean = false;

  // Verification du nom
  verifNomFonction() {
    if (this.nom == '') {
      this.verifNom = '';
    }
      // Vérifie si le nom contient uniquement des espaces
      else if (/^\s+$/.test(this.nom)) {
      this.verifNom = "Veuillez renseigner votre nom";
    }
     else {
      if (this.nom.length < 2) {
        this.exactNom = false;
        this.verifNom = 'Le nom est trop court';
      } else {
        this.exactNom = true;
        this.verifNom = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification du prenom
  verifPrenomFonction() {
    if (this.prenom == '') {
      this.verifPrenom = '';
    }
      // Vérifie si le prenom contient uniquement des espaces
      else if (/^\s+$/.test(this.prenom)) {
      this.verifPrenom = "Veuillez renseigner votre prenom";
    }
     else {
      if (this.prenom.length < 3) {
        this.exactPrenom = false;
        this.verifPrenom = 'Le prenom est trop court';
      } else {
        this.exactPrenom = true;
        this.verifPrenom = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification de  l'email

  verifEmailFonction(){
    if (this.email == '') {
      this.verifEmail = '';
    }
    else {
      if (this.validateEmail(this.email) == true) {
        console.log('true');
        this.exactEmail = true;
        this.verifEmail = 'le format du mail est valide';
        console.log(this.verifEmail);
      }

      if (this.validateEmail(this.email) == false) {
        console.log('false');
        this.exactEmail = false;
        this.verifEmail = 'le format du mail est invalide';
        console.log(this.verifEmail);
      }
    }
    // this.viderChamps();
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
    // const endsWithCom = /com$/;

    // return emailRegex.test(email) && endsWithCom.test(email);
    return emailRegex.test(email);
  }

  verifEmailConFonction() {
    if (this.formDate.email == '') {
      this.verifEmailCon = '';
    }
    else {
      if (this.validateEmail(this.formDate.email) == true) {
        console.log('true');
        this.exactEmailCon = true;
        this.verifEmailCon = 'le format du mail est valide';
        console.log(this.verifEmailCon);
      }

      if (this.validateEmail(this.formDate.email) == false) {
        console.log('false');
        this.exactEmailCon = false;
        this.verifEmailCon = 'le format du mail est invalide';
        console.log(this.verifEmailCon);
      }
    }
    // this.viderChamps();
  }


    // Verification du mot de passe

  validatePassword(password: string): boolean {
    return password.length >= 5;
  }

  verifPasswordFonction(){
    if (this.password == '') {
      this.verifPassword = '';
    }
    // Vérifie si le password contient uniquement des espaces
    else if (/^\s+$/.test(this.password)) {
      this.verifPassword = "Veuillez renseigner votre mot de passe";
    }
    else {
      if (this.password.length < 5) {
        this.exactPassword = false;
        this.verifPassword =
          'Le Mot de passe est trop court';
      } else {
        this.exactPassword = true;
        this.verifPassword = 'Mot de Passe Correcte';
      }
    }
    // this.viderChamps();
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  verifPasswordConFonction() {
    if (this.formDate.password == '') {
      this.verifPasswordCon = '';
    } else if (/^\s+$/.test(this.formDate.password)) {
      this.verifPasswordCon = "Veuillez renseigner votre mot de pasee";
    }
      else {
      if (this.formDate.password.length < 5) {
        this.exactPasswordCon = false;
        this.verifPasswordCon =
          'Le Mot de passe doit être superieur ou égal à 5 caractere';
      } else {
        this.exactPasswordCon = true;
        this.verifPasswordCon = 'Mot de Passe Correcte';
      }
    }
    // this.viderChamps();
  }

    // Verification du adresse
  verifAdresseFonction() {
    if (this.adresse == '') {
      this.verifAdresse = '';
    }
      // Vérifie si le adresse contient uniquement des espaces
      else if (/^\s+$/.test(this.adresse)) {
      this.verifAdresse = "Veuillez renseigner votre adresse";
    }
     else {
      if (this.adresse.length < 5) {
        this.exactAdresse = false;
        this.verifAdresse = 'L\'adresse est trop court';
      } else {
        this.exactAdresse = true;
        this.verifAdresse = ' Correct';
      }
    }
    // this.viderChamps();

  }

  // Verification du telephone
  verifTelephoneFonction() {
    if (this.telephone == '') {
      this.verifTelephone = '';
    }
    // Vérifie si le numéro de téléphone contient exactement 9 chiffres
    else if (!/^\d{9}$/.test(this.telephone)) {
      // this.exactTelephone = false;
      this.verifTelephone = 'Le numéro doit contenir 9 chiffres';
    }
     else {
      if (this.telephone.length < 9) {
        this.exactTelephone = false;
        this.verifTelephone = 'Le numero est trop court';
      } else {
        this.exactTelephone = true;
        this.verifTelephone = ' Correct';
      }
    }
    // this.viderChamps();
  }



  //methode pour se connecter

// Methode pour se connecter
onSubmit(): void {
  if (this.validateEmail(this.formDate.email) && this.validatePassword(this.formDate.password)) {
    // Effectuer la connexion
    let email = this.formDate.email;
    let password = this.formDate.password;

    this.verifPasswordConFonction();
    this.verifEmailConFonction();

    this.authService.connection({ email: email, password: password }).subscribe(
      (rep: any) => {
        let userClient = rep.user;
        console.log("merci", rep),
          localStorage.setItem('userConnect', rep.token)
        console.log('user', rep.token)
        let userName = rep.user.nom;
        this.authService.userNameSubject.next(userName);
        this.authService.userSubject.next(userClient);
        this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
        if (rep.user.role_id == '1') {
          this.router.navigate(['/admin']);
        } else if (rep.user.role_id == '2') {
          this.router.navigate(['/client']);
        } else if (rep.user.role_id == '3') {
          this.router.navigate(['/livreur']);
        }
        this.viderChamps();
      },
    );
  } else {
    this.verifierChamps('Erreur de validation', 'Veuillez remplir correctement tous les champs', 'error');
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
    // On fait appel au méthode qui permettent de vérifier les champs
      this.verifEmailFonction();
      this.verifNomFonction();
      this.verifAdresseFonction();
      this.verifTelephoneFonction();
      this.verifPrenomFonction();
      this.verifPasswordFonction();
      if (this.nom=="" || this.prenom=="" || this.email=="" || this.password=="" || this.adresse=="" || this.telephone=="" || this.image == "" ) {
        this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
        }
      else {
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
          this.verifierChamps('Félicitation!', rep.messagge, 'success');
          this.viderChamps();
        },
      (error) => {
        console.error('erreur',error);
      }
      )
    }
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
    // -----------------------------------
    this.verifNom = "";
    this.verifPrenom = "";
    this.verifEmail = "";
    this.verifPassword = "";
    this.verifAdresse = "";
    this.verifTelephone = "";
    this.verifEmailCon = "";
    this.verifPasswordCon="";
    // --------------------------------------
    this.exactNom = false;
    this.exactPrenom = false;
    this.exactEmail = false;
    this.exactEmailCon = false;
    this.exactPassword = false;
    this.exactPasswordCon = false;
    this.exactAdresse = false;
    this.exactTelephone = false;
    // this.verifI = "";

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
