import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pack } from 'src/app/models/login';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit {
  packChoisi: any;
  constructor(private route:ActivatedRoute){}

// lister les packs
    // packs:any;
    nomPacks: string="";
    imagePacks: any;
    prixPacks: string="";
    nombrePacks: number=0;
    idLastPack: number = 0;
    videoPacks: any;
  ngOnInit() {
    this.tabListesPacks=JSON.parse(localStorage.getItem("packs")|| "[]");



  }

  // lister les legumes
    // legumes:any[] =[];
    nomLegumes: string="";
    nombreLegumes: string="";
    prixLegumes: string="";
    imageLegumes: string="";
    idLastLegume: number = 0;

  // Propriété pour stocker l'id du pack sélectionné
  selectedPackId: number = 0;

  tabListesPacks:Pack[]=[];
  tabListesLegumes:any[]=[]
  tableg: any;

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
    this.tabListesLegumes=this.tabListesPacks[this.packLeg.idPack].legumes;
  }
  // Fonction pour ajouter
  addNewLegumes(){
    // if(this.tabListesLegumes.length){
    //   this.idLastPack = this.tabListesLegumes[this.tabListesLegumes.length-1].idLegume;
    // }
    let leg = {
      idLegume: this.tabListesPacks[this.packLeg.idPack].legumes.length + 1,
      nom : this.nomLegumes,
      image: this.imageLegumes,
      nombre:this.nombreLegumes,
      etatPack : 1,
      prix:this.prixLegumes,
    };

    // this.tabListesPacks.push(legumes);

    this.tabListesPacks[this.packLeg.idPack].legumes.push(leg);
    console.log('legumes test',leg)
    console.log('tabListeLegumes', this.tabListesLegumes)


    // // Mettre à jour le localStorage
    localStorage.setItem("legumes", JSON.stringify(this.tabListesLegumes));
    localStorage.setItem("packs", JSON.stringify(this.tabListesPacks));

    // Afficher le tableau dans la console (pour le débogage)
    console.log('localStorage après ajout de légume:', this.tabListesPacks);


  }
  // Fonction qui permet de faire des pointier si le texte est lon
  tronquerTexte(texte: string, longueurMax: number): string {
    if (texte.length > longueurMax) {
      return texte.substring(0, longueurMax) + '...';
    }
    return texte;
  }

  rechercheNom: string = '';
  pageActuelle: number = 1;
  taillePage: number = 6;

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


}
