import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier/panier.service';
import { LegumesService } from 'src/app/services/legumes/legumes.service';
import { Pack } from '../models/login';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-pagination',
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.css']
})
export class CardPaginationComponent implements OnInit {
  packChoisi: Pack | undefined;
  tabLegumes: any;
  packVideo: any;

  constructor(private panierService: PanierService,private LegumesService:LegumesService, private route:ActivatedRoute) {}
  idPackChoisi=this.route.snapshot.params['id']

  tabListesPacks:Pack[]=[];
  tabListesLegumes:any[]=[];

  ngOnInit() {
    // this.listerDesProduits();
    // this.totalProduit();
    this.tabListesPacks=JSON.parse(localStorage.getItem("packs")|| "[]");
    console.log(this.tabListesPacks);
    if(this.tabListesPacks){
      this.packChoisi=this.tabListesPacks.find((elt:any)=>elt.idPack==this.idPackChoisi);
      console.log(this.packChoisi)
      this.tabLegumes=this.packChoisi?.legumes;
      this.packVideo=this.packChoisi?.video;
      console.log("video",this.packVideo)
      console.log(this.tabLegumes)
    }


    console.log('Pack Oninit',this.tabListesPacks);
    // this.tabListesLegumes = JSON.parse(localStorage.getItem("legumes") || "[]");
    // console.log('legumes Oninit',this.tabListesLegumes);


  }

  // public nombreLegumes = 0;
  // public sommeLegumes = 0;
  // totalProduit() {
  //   this.nombreLegumes = 0;
  //   this.sommeLegumes = 0;
  //   let panierProduit = this.panierService.getFromPanier();
  //   panierProduit.forEach((element: any) => {
  //   this.nombreLegumes += element.quantitePanier;
  //   this.sommeLegumes += element.quantitePanier * element.produit.prix;
  //   });
  //   // console.log('total',this.totalProduit),
  // }

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
    nombreLegume: string="";
    prixLegumes: string="";
    imageLegumes: string="";
    idLastLegume: number = 0;
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

        alert(this.nombrePacks);
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
        nombre:this.nombreLegume,
        etatLegume : 1,
        prix:this.prixLegumes,
      };

      // this.tabListesPacks.push(legumes);

      this.tabListesPacks[this.packLeg.idPack-1].legumes.push(leg);
      console.log('legumes test',leg)
      console.log('tabListeLegumes', this.tabListesLegumes)


      // // Mettre à jour le localStorage
      localStorage.setItem("legumes", JSON.stringify(this.tabListesLegumes));
      localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));

      // Afficher le tableau dans la console (pour le débogage)
      console.log('localStorage après ajout de légume:', this.tabListesPacks);


    }


//     addPanier() {
//   let paniers=JSON.parse(localStorage.getItem("panier") || "[]");
//   this.tabLegumes.forEach((legume: any) => {
//     console.log('legume Panier',legume)
//     paniers.push(legume)
//     console.log(paniers)
//    localStorage.setItem("panier", JSON.stringify(paniers))
//   });
//   this.panierService.message("Parfait", "success", "Les légumes ont été ajoutés au panier");

//   // else {
//   //   console.log("Aucun légume à ajouter au panier.");
//   // }
// }

addPanier() {

    this.tabLegumes.forEach((legume: any) => {
      console.log('Legumes',legume)
      this.panierService.ajouterAuPanierLegumes(legume);
    });
    this.panierService.message("Parfait", "success", "Les légumes ont été ajoutés au panier");

}



  // methode supprimer
  public panier: any = [];

  deleteFromPanier(id: any) {
    let tab: any = [];
    tab = this.panierService.getFromPanier();
    tab.forEach((element: any, index: any) => {
      if (element.produit.id == id) {
        tab.splice(index, 1);
      }
    });
    localStorage.setItem('panier', JSON.stringify(tab));
    this.panier = this.panierService.getFromPanier();
    this.panierService.message("Parfait", "success", "produit retiré du panier");
    // this.totalProduit();

  }
    //Pour faire la recherche
    filterValue = '';
    filteredProduit: any;
     // le tableau
     tabListProduit : any []=[];

     itemsPerPage = 8;
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

}


