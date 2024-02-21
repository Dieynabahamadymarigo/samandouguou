import { Component } from '@angular/core';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent {


  tabListePacks = [
    { nom: 'Thiep bou dieune bou khonke', image: '../../../assets/plats/thip dieunne.png' },
    { nom: 'Yassa guinar', image: '../../../assets/plats/YASSAG-1-scaled-removebg-preview.png' },
    { nom: 'Deukhine', image: '../../../assets/plats/deukhine.png' },
    { nom: 'Firire', image: '../../../assets/plats/firire.png' },
    // { nom: 'Thiep guinar bou wekh', image: '../../../assets/plats/guinar.png' },
    { nom: 'Petit poids', image: '../../../assets/plats/petitPoids.png' },
    { nom: 'Thiep bou dieune bou wekh', image: '../../../assets/plats/rizBlanc.png' },
    { nom: 'Saka Saka', image: '../../../assets/plats/saka.png' },
    { nom: 'Thiep bou khonke guinar', image: '../../../assets/plats/thiepYapp.png' },
    { nom: 'Yassa dieunne', image: '../../../assets/plats/yassPOI.png' },
  ];

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

  get packsFiltres() {
    const packsFiltres = this.tabListePacks.filter(pack =>
      pack.nom.toLowerCase().includes(this.rechercheNom.toLowerCase())
    );
    return packsFiltres.slice((this.pageActuelle - 1) * this.taillePage, this.pageActuelle * this.taillePage);
  }

  get nombrePages() {
    const packsFiltres = this.tabListePacks.filter(pack =>
      pack.nom.toLowerCase().includes(this.rechercheNom.toLowerCase())
    );
    return Math.ceil(packsFiltres.length / this.taillePage);
  }
  nombrePagesArray() {
    return Array.from({ length: this.nombrePages }, (_, index) => index + 1);
  }

  changerPage(page: number) {
    this.pageActuelle = page;
  }


}
