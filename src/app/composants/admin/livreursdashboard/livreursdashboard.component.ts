import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login/login.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livreursdashboard',
  templateUrl: './livreursdashboard.component.html',
  styleUrls: ['./livreursdashboard.component.css']
})
export class LivreursdashboardComponent {
  user: User = new User();

  // Déclarations des attributs
  nom : string  =  "";
  prenom : string = "";
  email : string = "";
  password : string = "";
  adresse : string = "";
  telephone : string = "";
  statut : boolean = false;
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

  // variable pour gérer la déconnexion
  connectUser: boolean = false;
  userName: string = '';
  userClient: any = [];

  constructor (private router: Router, private authService : LoginService, private LegumesService: LegumesService){}

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
  });
  
  this.listerLivreur();

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
    this.authService.inscritLivreur(this.formDate).subscribe(
      (rep)=>{
        console.log('réussi',rep)
        let userClient = rep.user;
      console.log('userClient', userClient)
        localStorage.setItem('userConnect',rep.token)
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

    if (this.email=="" && this.password=="" ) {
      this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
      }
     else {
          this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
      }
  this.viderChamps();

}


//   // inserer l'image
  getFile(event: any) {
    console.log('img',this.image)
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  //methode pour inscription client
  onInscrire() : void{
    if (this.nom=="" && this.prenom=="" && this.email=="" && this.password=="" && this.adresse=="" && this.telephone=="" && this.image == "" ) {
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
    // formData.append("statut", false);
    console.log('bjr',formData)

    this.authService.inscritLivreur(formData).subscribe(
      (rep)=>{
        console.log('réussi',rep)
        this.listerLivreur();
      },
    (error) => {
      console.error('erreur',error);
    }
    );
      this.verifierChamps('Félicitation!', 'Connexion réussie', 'success');
    }
    this.viderChamps();
  }

  modifierLivreur() {
    let formData = new FormData();
    formData.append("nom", this.nom);
    formData.append("prenom", this.prenom);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("adresse", this.adresse);
    formData.append("telephone", this.telephone);
    formData.append("image", this.image);
    this.LegumesService.updateLivreur(this.id, formData).subscribe((response) => {
        console.log('modifProduit', response);
        this.listerLivreur()
      });
  }

  // declare id
  id: number = 0;
  chargerInfosLivreur(livreur: any) {
    console.log(livreur);
    this.id = livreur.id;
    console.warn('lid de marigo', this.id);
    this.nom = livreur.nom;
    this.prenom = livreur.prenom;
    this.email = livreur.email;
    this.password = livreur.password;
    this.adresse = livreur.adresse;
    this.telephone = livreur.telephone;
    this.image = livreur.image;
    console.log('changer', this.chargerInfosLivreur);
    this.listerLivreur()
  }

  // methode pour supprimer

  supprimerLivreur(id:number){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer cet livreur",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.LegumesService.deleteProduit(id).subscribe((response) => {
          console.log('supProduit', response);
          this.listerLivreur()
        });
      }
    });
}

  // lister  des clients
  listerUsers() {
    // console.log(this.tabListLivreur);
    this.LegumesService.listerDesUsers().subscribe((data) => {
      console.log('listeDesUser', data);
      this.tabListLivreur = data;
      console.log('listeUser', this.tabListLivreur);
    });
    // console.log('user',this.listerUsers)
  }


  // lister  des livreurs
  // tabListLivreur: any[] = [];
    listerLivreur() {
      // console.log(this.tabListLivreur);
      this.LegumesService.listerDesLivreurs().subscribe((data) => {
        console.log('listeDesUser', data);
        this.tabListLivreur = data;
        console.log('listeLivreur', this.tabListLivreur);
      });
      // console.log('user',this.listerUsers)
    }

    //  pour recuperer un produit
    userSelectionner: any = {};

    getLivreur(livreur: any) {
      this.userSelectionner = livreur;
    }


      //Pour faire la recherche
      filterValue = '';
      filteredLivreur: any;

     // le tableau
     tabListLivreur : any []=[];

     itemsPerPage = 6;
     currentPage = 1;

     onSearch() {
      this.currentPage = 1; // Réinitialiser la page à 1 lorsqu'une recherche est effectuée

      // Recherche se fait selon le nom du produit
      this.filteredLivreur = this.tabListLivreur.filter((elt: any) =>
        elt?.prenom.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }

    get visibleLivreurs() {
      // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
      const sourceArray = this.filteredLivreur ? this.filteredLivreur : this.tabListLivreur;

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return sourceArray.slice(startIndex, endIndex);
    }

    totalPagesArray(): number[] {
      // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
      const sourceArray = this.filteredLivreur ? this.filteredLivreur : this.tabListLivreur;

      return Array.from({ length: Math.ceil(sourceArray.length / this.itemsPerPage) }, (_, i) => i + 1);
    }

    setPage(page: number) {
      // Vérifiez si la page est valide en fonction du nombre total de pages
      if (page >= 1 && page <= this.totalPagesArray().length) {
        this.currentPage = page;
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
  this.statut = true;
  this.formDate = "";
}

}
