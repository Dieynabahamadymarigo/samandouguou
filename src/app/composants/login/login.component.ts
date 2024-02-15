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
   emailCon : String = "";
   passwordCon: String = "";

   // Pour vérifier les champs pour la connexion
   verifEmailCon : String = "";
   verifPasswordCon: String = "";

   // Variables Si les valeurs sont exactes
   exactEmailCon : boolean = false;
   exactPasswordCon : boolean = false;

  // Verification du nom
  verifNomFonction() {
    this.exactNom = false;
    if(this.nom == ""){
      this.verifNom = "Veuillez renseigner votre nom";
    }
    else if (/^\s+$/.test(this.nom)) {
      // Vérifie si le nom contient uniquement des espaces
      this.verifNom = "Veuillez renseigner votre nom";
    }
    else if (this.nom.length < 2 ){
      this.verifNom = "Le nom est trop court";
    }
    else {
      this.verifNom = "";
      this.exactNom = true;
    }
  }

  // Verification du prenom
  verifPrenomFonction() {
    this.exactPrenom = false;
    if(this.prenom == ""){
      this.verifPrenom = "Veuillez renseigner votre prenom";
    }
    else if (/^\s+$/.test(this.prenom)) {
      // Vérifie si le nom contient uniquement des espaces
      this.verifPrenom = "Veuillez renseigner votre prenom";
    }
    else if (this.prenom.length < 3 ){
      this.verifPrenom = "Le prenom est trop court";

    }
    else{
      this.verifPrenom = "";
      this.exactPrenom = true;
    }
  }

  // Verification de  l'email
  verifEmailFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;

    if(this.email == ""){
      this.verifEmail = "Veuillez renseigner votre email";
    }
    else if (!this.email.match(emailPattern) ){
      this.verifEmail = "Veuillez donner un email valide";
    }
    else {
      this.verifEmail = "";
      this.exactEmail = true;
    }
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  verifEmailConFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmailCon = false;

    if(this.emailCon == ""){
      this.verifEmailCon = "Veuillez renseigner votre email";
    }
    else if (!this.emailCon.match(emailPattern) ){
      this.verifEmailCon = "Veuillez donner un email valide";
    }
    else {
      this.verifEmailCon = "";
      this.exactEmailCon = true;
    }
  }

    // Verification du mot de passe
    verifPasswordFonction(){
      this.exactPassword = false;
      if(this.password == ""){
        this.verifPassword = "Veuillez renseigner votre mot de passe";
      }
      else if (/^\s+$/.test(this.password)) {
        // Vérifie si le nom contient uniquement des espaces
        this.verifPassword = "Veuillez renseigner votre prenom";
      }
      else if (this.password.length < 5 ){
        this.verifPassword = "Mot de passe est trop court";
      }
      else{
        this.verifPassword = "";
        this.exactPassword = true;
      }
    }

    // Fonction de Verification de l'email pour la fonctionnalité connexion
    verifPasswordConFonction(){
      this.exactPasswordCon = false;
      if(this.passwordCon == ""){
        this.verifPasswordCon = "Veuillez renseigner votre mot de passe";
      }
      else if (this.passwordCon.length < 5 ){
        this.verifPasswordCon = "Mot de passe doit être supérieur ou égal à 5";
      }
      else{
        this.verifPasswordCon = "";
        this.exactPasswordCon = true;
      }
    }

      // Verification du adresse
  verifAdresseFonction() {
    this.exactAdresse = false;
    if(this.adresse == ""){
      this.verifAdresse = "Veuillez renseigner votre adresse";
    }
    else if (/^\s+$/.test(this.adresse)) {
      this.verifAdresse = "Veuillez renseigner votre prenom";
    }
    else if (this.adresse.length < 4 ){
      this.verifAdresse = "Le adresse est trop court";
    }
    else{
      this.verifAdresse = "";
      this.exactAdresse = true;
    }
  }

  // Verification du telephone
  verifTelephoneFonction() {
    this.exactTelephone = false;
    if(this.telephone == ""){
      this.verifTelephone = "Veuillez renseigner votre telephone";
    }
    else if (/^\s+$/.test(this.telephone)) {
      this.verifTelephone = "Veuillez renseigner votre prenom";
    }
    else if (this.telephone.length < 9 ){
      this.verifTelephone = "Le telephone est trop court";

    }
    else{
      this.verifTelephone = "";
      this.exactTelephone = true;
    }
  }



  //methode pour se connecter
  onSubmit() : void{
    this.verifPasswordConFonction();
    this.verifEmailConFonction();
    if (this.formDate.email=="" || this.formDate.password=="" ) {
      this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
      // window.location.reload();
    }
    else {
      console.log("merci", this.formDate),
      this.authService.connection(this.formDate).subscribe(
        (rep)=>{
          // console.log('le nom client',rep.user)
        let userClient = rep.user;
        // console.log('userClient', userClient);
        localStorage.setItem('userConnect',rep.token)
        console.log('user',rep.token)
          // Utilisation de la réponse pour obtenir le nom d'utilisateur
          let userName = rep.user.nom;
          // Émettre le nom d'utilisateur à travers l'observable userName$
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
          else if (rep.user.role_id=='3')
          {
            this.router.navigate(['/livreur']);
            // alert('voux etes livreur')
          }
          else {

          }

          // this.onSubmit();
        },
        (error) => {
          console.error('Erreur lors de la connexion :', error);
          // Ajoutez ici la gestion des erreurs, par exemple, afficher un message d'erreur à l'utilisateur
        }
        );
        this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
      }

    this.viderChamps();
    // this.onSubmit();

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
          this.verifierChamps('Félicitatio  n!', rep.messagge, 'success');
        },
      (error) => {
        console.error('erreur',error);
      }
      )
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
