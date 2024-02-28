import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Déclarations des attributs
  email : string = "";

   // Méthode pour afficher un sweetalert2 apres vérification
   verifierChamps(title:any, text:any, icon:any) {
     Swal.fire({
       title: title,
       text: text,
       icon: icon,
       showConfirmButton:false,
     });
   // Ferme le pop-up après 2 secondes
   setTimeout(() => {
     Swal.close();
   }, 1500);
   }

  // Variables pour faire la vérifications
  verifEmail : String = "";

  // Variables si les champs sont exacts
  exactEmail : boolean = false;


  ngOnInit(): void {

  this.tabListesNewsLetters=JSON.parse(localStorage.getItem("news letters")|| "[]");
  console.log('newsletter',this.tabListesNewsLetters)


  }
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

  tabListesNewsLetters:any[]=[];
  idLastNews: number = 0;


  // Fonction pour ajouter un news letters
  addNews() {
    this.verifEmailFonction();

    if(this.tabListesNewsLetters.length){
      this.idLastNews = this.tabListesNewsLetters[this.tabListesNewsLetters.length-1].id;
    }
    let newsLetterData = {
      id: this.idLastNews + 1,
      email: this.email,

    };

    let existContact;

    if (this.exactEmail == true) {
      existContact = this.tabListesNewsLetters.find((element:any) => element.email == this.email);

      if(existContact){
        this.verifierChamps("Impossible", "Ce compte existe déjà", "error");
      }

      else{
      this.tabListesNewsLetters.push(newsLetterData);
      localStorage.setItem('news letters', JSON.stringify(this.tabListesNewsLetters));
      this.verifierChamps("Felicitation!", "Vous êtes inscrit dans notre news letters", "success");
      this.viderChamps();
      }

    }
    else{
      this.verifierChamps("Erreur!", "Veillez remplir le champs", "error");
    }
  }

  viderChamps(){
    this.email="";
    this.verifEmail="";
    this.exactEmail=false;
  }


}
