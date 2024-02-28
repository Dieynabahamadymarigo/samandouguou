import Swal from 'sweetalert2';
import { Pack, Produits, User } from './../../../models/login';
import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login/login.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  // variables pour les noms des produits
  produits: Produits = new Produits();

  nomProduit: string = '';
  prix: string = '';
  quantiteTotale: string = '';
  description: string = '';
  image: any = '';
  categorieProduit: string[] =  [];
  creatAt = '';
  updateAt = '';

  // le tableau
  tabListProduit: any[] = [];
  tabListUser: any[] = [];

  // variables choix de produits
  tabProduits: boolean = true;
  tabPacks: boolean = false;
  tabClients: boolean = false;

  tabListesPacks:Pack[]=[];
  tabListesLegumes:any[]=[];
  tableg: any;

  //choix de produits pour tableau produits
  afficheProduits() {
    this.tabProduits = true;
    this.tabPacks = false;
    this.tabClients = false;
  }

  //choix de produits pour tableau packs
  affichePacks() {
    this.tabProduits = false;
    this.tabPacks = true;
    this.tabClients = false;
  }

  //choix de produits pour tableau clients
  afficheClients() {
    this.tabProduits = false;
    this.tabPacks = false;
    this.tabClients = true;
  }

  constructor(
    private authService: LegumesService,
    private LegumesService: LegumesService,
    private securiteVideo: DomSanitizer
  ) {}



  ngOnInit(): void {

    this.listerDesProduits();
    this.listerUsers();

    // if (!localStorage.getItem("packs")) {
    //   localStorage.setItem("packs", JSON.stringify(""))
    // }

    // const storedPacks = localStorage.getItem('packs');
    // this.tabListesPacks = storedPacks ? JSON.parse(storedPacks) : [];
    if(!localStorage.getItem("packs")){
      localStorage.setItem("packs", JSON.stringify(this.tableg))
    }

    this.tabListesPacks=JSON.parse(localStorage.getItem("packs")|| "[]");
    // this.tabListesLegumes = JSON.parse(localStorage.getItem("legumes") || "[]");
    console.log('legumes Oninit',this.tabListesPacks)

  }
// --------------------------------------------------------------😉
  // inserer l'image
  getFile(event: any) {
    console.log('img', this.image);
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
  verifNomProduit : String  =  "";
  exactNomProduit : boolean = false;

  // Verification du nomProduit
  verifPrixFonction() {
    if (this.nomProduit == '') {
      this.verifNomProduit = '';
    }
    // Vérifie si le nom du produit contient des chiffres
    else if (!/^\d+$/.test(this.nomProduit)) {
      this.exactNomProduit = false;
      this.verifNomProduit = 'Leprix doit contenir des chiffres';
    }
    else {
      this.exactNomProduit = true;
      this.verifNomProduit = 'Correct';
    }
  }
  //methode pour ajouter des prduits
  ajout(): void {
    let formData = new FormData();
    formData.append('nomProduit', this.nomProduit);
    formData.append('prix', this.prix);
    formData.append('quantiteTotale', this.quantiteTotale);
    formData.append('description', this.description);
    formData.append('image', this.image);

    this.authService.ajoutProduit(formData).subscribe(
      (rep) => {
        // this.verifPrixFonction();
         if (this.nomProduit == "" || this.prix == "" || this.quantiteTotale == "", this.description== "" || this.image == ""){
          this.verifierChamps('Champs obligatoire', 'Veuillez remplir les champs', 'error');
        }

        else {
            // Vérifier si le prix contient des lettres
          if (!this.exactNomProduit) {
            this.verifierChamps('Erreur', 'Le prix doit contenir uniquement des chiffres', 'error');
            return; // Arrêter la fonction si le prix contient des lettres
          }
          // Vérifier si le nom ou l'image existent déjà
        const produitExiste = this.tabListProduit.some((legume: any) => {
          console.log('this.image:', this.image);
          console.log('legume.image:', legume.image);
          return legume.nomProduit === this.nomProduit || legume.image === this.image;
        });

        if (produitExiste) {
          this.verifierChamps('Erreur', 'Le produit existe déjà dans la liste', 'error');
          console.log('produitExiste',produitExiste)
        }
        else {
          this.verifierChamps('Félicitation!', 'Produit ajouté', 'success');
          this.viderChamps();
        }
        this.listerDesProduits();
        }
      },
      (error) => {
        console.error('erreur', error);
      }
    );
  }


  // lister  produits
  listerDesProduits() {
    // console.log(this.tabListProduit);
    this.LegumesService.listerDesProduits().subscribe((data) => {
      // console.log('listeProduits', data.ListeProduit);
      this.tabListProduit = data.ListeProduit;
      console.log('tab', data.ListeProduit);
    });
  }

  //  pour recuperer un produit
  produitSelectionner: any = {};

  getProduit(produit: any) {
    this.produitSelectionner = produit;
  }


  modifierProduit() {
    let formData = new FormData();
      formData.append('nomProduit', this.nomProduit,);
      formData.append('prix', this.prix,);
      formData.append('quantiteTotale', this.quantiteTotale,);
      formData.append('image', this.image,);
      formData.append('description', this.description,);
    this.authService.updateProduit(this.id, formData).subscribe((response) => {
        console.log('modifProduit', response);
        this.listerDesProduits();

      });
  }

  // declare id
  id: number = 0;
  chargerInfosProduit(produit: any) {
    console.log(produit);
    this.id = produit.id;
    console.warn('lid de marigo', this.id);
    this.nomProduit = produit.nomProduit;
    this.prix = produit.prix;
    this.quantiteTotale = produit.quantiteTotale;
    this.description = produit.description;
    this.image = produit.image;
    console.log('changer', this.chargerInfosProduit);
    this.listerDesProduits();

  }

  // methode pour supprimer

  supprimerProduit(id:number){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer le produit",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteProduit(id).subscribe((response) => {
          console.log('supProduit', response);
          this.listerDesProduits();

        });
      }
    });
}

    //Pour faire la recherche
    filterValue = '';
    filteredProduit: any;

   itemsPerPage = 6;
   currentPage = 1;

   onSearch() {
    this.currentPage = 1; // Réinitialiser la page à 1 lorsqu'une recherche est effectuée

    // Recherche se fait selon le nom du produit
    this.filteredProduit = this.tabListProduit.filter((elt: any) =>
      elt?.nomProduit.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  get visibleProduits() {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return sourceArray.slice(startIndex, endIndex);
  }

  totalPagesArray(): number[] {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    return Array.from({ length: Math.ceil(sourceArray.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  setPage(page: number) {
    // Vérifiez si la page est valide en fonction du nombre total de pages
    if (page >= 1 && page <= this.totalPagesArray().length) {
      this.currentPage = page;
    }
  }

//  ------------------------------------------------------😉
// lister les packs
    // packs:any;
    nomPacks: string="";
    imagePacks: any;
    prixPacks: string="";
    nombrePacks: number=0;
    idLastPack: number = 0;
    videoPacks: any;


    // lister les legumes
    // legumes:any[] =[];
    nomLegumes: string="";
    nombreLegumes: string="";
    prixLegumes: string="";
    imageLegumes: string="";
    idLastLegume: number = 0;

  // Propriété pour stocker l'id du pack sélectionné
  selectedPackId: number = 0;

  // selectedImage: File | null = null;

  // Méthode pour obtenir une URL de vidéo sécurisée
  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.securiteVideo.bypassSecurityTrustResourceUrl(videoUrl);

  }

    // inserer une image
    getFileLocalStorage(event: any) {
      console.log('img', this.imagePacks);
      console.warn(event.target.files[0]);
      this.imagePacks = event.target.files[0] as File;
    }



      // Fonction pour ajouter
      addNewPack() {
        console.log('nom avant',this.nombrePacks);
        if(this.tabListesPacks.length){
          this.idLastPack = this.tabListesPacks[this.tabListesPacks.length-1].idPack;
        }
        let pack = {
          idPack: this.idLastPack + 1,
            nom : this.nomPacks,
            image: this.imagePacks,
            nombre:this.nombrePacks,
            video: this.videoPacks,
            etatPack : 1,
            legumes: [],
          }

          this.tabListesPacks.push(pack);
          localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));
          // this.tabListesPacks=JSON.parse(localStorage.getItem('packs')||'[]');

        // }
        console.log('localStorage:',this.tabListesPacks);

      }
      packLeg:any;
      Packclique(PackLegume:any){
        this.packLeg=PackLegume;
        console.log(this.packLeg);
        // console.log(this.tabListesPacks[1])
        this.tabListesLegumes=this.tabListesPacks[this.packLeg.idPack-1].legumes;
        console.log('idPack',this.packLeg)
        console.log('lisitPack',this.tabListesLegumes)
      }
      // Fonction pour ajouter
      addNewLegumes(){
        // if(this.tabListesLegumes.length){
        //   this.idLastLegume = this.tabListesLegumes[this.tabListesLegumes.length-1].idLegume;
        // }
        let leg = {
          idLegume: this.tabListesPacks[this.packLeg.idPack-1].legumes.length + 1,
          // idLegume: this.idLastLegume + 1,
          nom : this.nomLegumes,
          image: this.imageLegumes,
          nombre:this.nombreLegumes,
          etatLegume : 1,
          prix:this.prixLegumes,
        };

        // this.tabListesPacks.push(legumes);

        this.tabListesPacks[this.packLeg.idPack-1].legumes.push(leg);
        console.log('legumes test',leg)
        console.log('tabListeLegumes', this.tabListesLegumes)


        // // Mettre à jour le localStorage
        // localStorage.setItem("legumes", JSON.stringify(this.tabListesLegumes));
        localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));

        // Afficher le tableau dans la console (pour le débogage)
        console.log('localStorage après ajout de légume:', this.tabListesPacks);


      }

  // Fonction qui permet de faire des pointier si le texte est long
  tronquerTexte(texte: string, longueurMax: number): string {
    if (texte.length > longueurMax) {
      return texte.substring(0, longueurMax) + '...';
    }
    return texte;
  }

  // Détail pack
  detailMatiere(pack:any){
    this.nomPacks = pack.nom;
    this.imagePacks = pack.image;
    this.nombrePacks = pack.nombre;
    this.videoPacks = pack.video;
    console.log('videoDetail',pack.video)
  }

  // modifier un pack
  modifierPack() {
    this.packFound.nom=this.nomPacks;
    this.packFound.image=this.imagePacks;
    this.packFound.nombre=this.nombrePacks;
    this.packFound.video=this.videoPacks;
    console.log('mod',this.packFound.image)

    localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));
  }

  // declare id
  idPackSup: number = 0;
  packFound:any;
  chargerInfosPack(pack: any) {
    console.log(pack);
    this.packFound=pack;
    this.nomPacks=pack.nom;
    this.imagePacks=pack.image;
    this.videoPacks=pack.video;
    this.nombrePacks=pack.nombre;
    // this.prixLegumes=pack.prixLegumes;
  }

  // methode pour supprimer
  supprimerPack(paramPack:any){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer le pack",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        // alert(paramPack.etatPack)
        // Recherche de l'index de paramPack dans le tableau
      const index = this.tabListesPacks.indexOf(paramPack);
      if (index !== -1) {
        // Utilisation de la méthode splice pour supprimer l'élément du tableau
        this.tabListesPacks.splice(index, 1);
      }
        // paramPack.etatPack=0;
        console.log('supPack',paramPack.etatPack)
        localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));
      }
    });
}

  // modifier un legume
  modifierLegume() {
    this.legumeFound.nom=this.nomLegumes;
    this.legumeFound.image=this.imageLegumes;
    this.legumeFound.nombre=this.nombreLegumes;
    this.legumeFound.nombre=this.nombreLegumes;
    this.legumeFound.prix=this.prixLegumes;
    console.log('mod',this.legumeFound.image)

    localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));
  }

  // declare id
  idLegumeSup: number = 0;
  legumeFound:any;
  chargerInfoLegume(legume: any) {
    console.log(legume);
    this.legumeFound=legume;
    this.nomLegumes=legume.nom;
    this.imageLegumes=legume.image;
    this.nombreLegumes=legume.nombre;
    this.prixLegumes=legume.prix;
  }

  // methode pour supprimer
  supprimerLegume(paramLegume:any){

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer le legume",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A6060",
      cancelButtonColor: "#2FA7A7",
      confirmButtonText: "Oui, je supprime!",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        alert(paramLegume.etatLegume)
        paramLegume.etatLegume=0;
        console.log('sup',paramLegume.etatLegume)
        localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));

      }
    });
}

    //Pour faire la recherche
    filterPackValue = '';
    filteredPackProduit: any;

   itemsPackPage = 6;
   currentPackPage = 1;

   onSearchPack() {
    this.currentPackPage = 1;

    // Recherche se fait selon le nom du produit
    this.filteredPackProduit = this.tabListesPacks.filter(pack =>
      pack.nom.toLowerCase().includes(this.filterPackValue.toLowerCase())
    );
  }

  get visiblePackProduits() {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    const sourceArray = this.filteredPackProduit ? this.filteredPackProduit : this.tabListesPacks;

    const startIndex = (this.currentPackPage - 1) * this.itemsPackPage;
    const endIndex = startIndex + this.itemsPackPage;

    return sourceArray.slice(startIndex, endIndex);
  }

  totalPagesPackArray(): number[] {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    const sourceArray = this.filteredPackProduit ? this.filteredPackProduit : this.tabListesPacks;

    return Array.from({ length: Math.ceil(sourceArray.length / this.itemsPackPage) }, (_, i) => i + 1);
  }

  setPagePack(page: number) {
    // Vérifiez si la page est valide en fonction du nombre total de pages
    if (page >= 1 && page <= this.totalPagesPackArray().length) {
      this.currentPackPage = page;
    }
  }
//  ------------------------------------------------------😉
  // lister  des clients
  listerUsers() {
    // console.log(this.tabListUser);
    this.LegumesService.listerDesUsers().subscribe((data) => {
      console.log('listeDesUser', data);
      this.tabListUser = data;
      console.log('listeUser', this.tabListUser);
    });
    // console.log('user',this.listerUsers)
  }

    //  pour recuperer un user
    userSelectionner: any = {};

    getUser(user: any) {
      this.userSelectionner = user;
    }


  // pagination des users
  get visibleUsers() {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    // const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.tabListUser.slice(startIndex, endIndex);
  }

  totalPageArray(): number[] {
    // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
    // const tabListUser = this.filteredProduit ? this.filteredProduit : this.tabListProduit;

    return Array.from({ length: Math.ceil(this.tabListUser.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  setPages(page: number) {
    // Vérifiez si la page est valide en fonction du nombre total de pages
    if (page >= 1 && page <= this.totalPagesArray().length) {
      this.currentPage = page;
    }
  }


  viderChamps() {
    this.nomProduit = '';
    this.prix = '';
    this.quantiteTotale = '';
    this.description = '';
    this.image = '';
    // -------------------
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton:false,
    });
  // Ferme le pop-up après 2 secondes
  setTimeout(() => {
    Swal.close();
  }, 2000);
  }

}

