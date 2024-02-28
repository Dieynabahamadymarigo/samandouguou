import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  // Déclarations des attributs
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  message: string = '';

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: false,
    });
    // Ferme le pop-up après 2 secondes
    setTimeout(() => {
      Swal.close();
    }, 1500);
  }

  // Variables pour faire la vérifications
  verifNom: String = '';
  verifPrenom: String = '';
  verifEmail: String = '';
  verifTelephone: String = '';
  verifMessage: String = '';

  // Variables si les champs sont exacts
  exactNom: boolean = false;
  exactPrenom: boolean = false;
  exactEmail: boolean = false;
  exactTelephone: boolean = false;
  exactMessage: boolean = false;

  ngOnInit(): void {
    this.tabListesContact = JSON.parse(localStorage.getItem('contact') || '[]');
    console.log('legumes Oninit', this.tabListesContact);
  }

  // Verification du nom
  verifNomFonction() {
    if (this.nom == '') {
      this.verifNom = '';
    }
    // Vérifie si le nom contient uniquement des espaces
    else if (/^\s+$/.test(this.nom)) {
      this.verifNom = 'Veuillez renseigner votre nom';
    } else {
      if (this.nom.length < 2) {
        this.exactNom = false;
        this.verifNom = 'Le nom est trop court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.nom)) {
        // Utilisation de l'expression régulière
        this.exactNom = false;
        this.verifNom = 'Veuillez renseigner un nom correct';
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
      this.verifPrenom = 'Veuillez renseigner votre prenom';
    } else {
      if (this.prenom.length < 3) {
        this.exactPrenom = false;
        this.verifPrenom = 'Le prenom est trop court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.prenom)) {
        // Utilisation de l'expression régulière
        this.exactPrenom = false;
        this.verifPrenom = 'Veuillez renseigner un prenom correct';
      } else {
        this.exactPrenom = true;
        this.verifPrenom = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification de  l'email

  verifEmailFonction() {
    if (this.email == '') {
      this.verifEmail = '';
    } else {
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
  // Verification du message
  verifMessageFonction() {
    if (this.message == '') {
      this.verifMessage = '';
    }
    // Vérifie si le message contient uniquement des espaces
    else if (/^\s+$/.test(this.message)) {
      this.verifMessage = 'Veuillez renseigner votre message';
    } else {
      if (this.message.length < 5) {
        this.exactMessage = false;
        this.verifMessage = 'Le message est trop court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.message)) {
        // Utilisation de l'expression régulière
        this.exactMessage = false;
        this.verifMessage = 'Veuillez renseigner un message correct';
      } else {
        this.exactMessage = true;
        this.verifMessage = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification du telephone
  verifTelephoneFonction() {
    if (this.telephone == '') {
      this.verifTelephone = '';
    }
    // Vérifie si le numéro de téléphone commence par 77, 78, 76 ou 70
    else if (!/^(77|78|76|70)\d{7}$/.test(this.telephone)) {
      this.exactTelephone = false;
      // this.verifTelephone = 'Le numéro doit commencer par 77, 78, 76 ou 70 ';
      this.verifTelephone = 'Le numéro doit contenir 9 chiffres';
    }
    // Vérifie si le numéro de téléphone contient exactement 9 chiffres
    else if (!/^\d{9}$/.test(this.telephone)) {
      this.exactTelephone = false;
      this.verifTelephone = 'Le numéro doit contenir 9 chiffres';
    } else if (this.telephone.length < 9) {
      this.exactTelephone = false;
      this.verifTelephone = 'Le numero est trop court';
    } else {
      this.exactTelephone = true;
      this.verifTelephone = ' Correct';
    }
  }

  tabListesContact: any[] = [];
  idLastContact: number = 0;

  // Fonction pour ajouter un contact
  addConntact() {
    this.verifNomFonction();
    this.verifPrenomFonction();
    this.verifEmailFonction();
    this.verifTelephoneFonction();
    this.verifMessageFonction();

    if (this.tabListesContact.length) {
      this.idLastContact =
        this.tabListesContact[this.tabListesContact.length - 1].id;
    }
    let contactData = {
      id: this.idLastContact + 1,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      telephone: this.telephone,
      message: this.message,
    };

    let existContact;

    if (
      this.exactNom &&
      this.exactPrenom &&
      this.exactEmail &&
      this.exactTelephone &&
      this.exactMessage == true
    ) {
      existContact = this.tabListesContact.find(
        (element: any) => element.email == this.email
      );

      if (existContact) {
        this.verifierChamps('Impossible', 'Ce compte existe déjà', 'error');
      } else {
        this.tabListesContact.push(contactData);
        localStorage.setItem('contact', JSON.stringify(this.tabListesContact));
        this.verifierChamps(
          'Felicitation!',
          'Compte créé avec succes',
          'success'
        );
        this.viderChamps();
      }
    } else {
      this.verifierChamps(
        'Erreur!',
        'Tous les champs sont obligatoires',
        'error'
      );
    }
  }

  viderChamps() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.telephone = '';
    this.message = '';
    // ------------
    this.verifNom = '';
    this.verifPrenom = '';
    this.verifEmail = '';
    this.verifTelephone = '';
    this.verifMessage = '';
    // ----------
    this.exactNom = false;
    this.exactPrenom = false;
    this.exactEmail = false;
    this.exactTelephone = false;
    this.exactMessage = false;
  }
}
