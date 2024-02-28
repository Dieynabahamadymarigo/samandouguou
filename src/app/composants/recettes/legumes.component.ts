import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'legumes',
  templateUrl: './legumes.component.html',
  styleUrls: ['./legumes.component.css']
})
export class LegumesComponent {

  constructor(private securiteVideo: DomSanitizer) {}

  tabListePacks = [
    { plat: 'paella', videoUrl: "https://www.youtube.com/embed/YMoa-uSyfw8?si=y6jraaUX-0YWSygx" },
    { plat: 'Guinar au petits pois', videoUrl: "https://www.youtube.com/embed/CC3Q-1_JcIo?si=986rMBIzneQamjXE" },
    { plat: 'thiep yap vermicelle', videoUrl: "https://www.youtube.com/embed/_881ummRYgA?si=B0Pj23Q0iMPF0JyS" },
    { plat: 'Poisson pané avec crudités ', videoUrl: "https://www.youtube.com/embed/prf12QmHTg4?si=39Np3tFCLlJtm950" },
    { plat: 'Thiep bou wekh ak sauce nététou bou wekh', videoUrl: "https://www.youtube.com/embed/PqUep3-45NY?si=eWXO-0FQP0gCyQPG" },
    // { plat: 'Thiep bou dieune bou wekh', videoUrl: '../../../assets/plats/rizBlanc.png' },
    // { plat: 'Saka Saka', videoUrl: '../../../assets/plats/saka.png' },
    // { plat: 'Thiep bou khonke guinar', videoUrl: '../../../assets/plats/thiepYapp.png' },
    // { plat: 'Yassa dieunne', videoUrl: '../../../assets/plats/yassPOI.png' },
  ];

    // Fonction qui permet de faire des pointier si le texte est long
    tronquerTexte(texte: string, longueurMax: number): string {
      if (texte.length > longueurMax) {
        return texte.substring(0, longueurMax) + '...';
      }
      return texte;
    }

  rechercheNom: string = '';
  pageActuelle: number = 1;
  taillePage: number = 6;

  getSafeUrl(videoUrl: string) {
    return this.securiteVideo.bypassSecurityTrustResourceUrl(videoUrl);
  }

  get packsFiltres() {
    const packsFiltres = this.tabListePacks.filter(pack =>
      pack.plat.toLowerCase().includes(this.rechercheNom.toLowerCase())
    );
    return packsFiltres.slice((this.pageActuelle - 1) * this.taillePage, this.pageActuelle * this.taillePage);
  }

  get nombrePages() {
    const packsFiltres = this.tabListePacks.filter(pack =>
      pack.plat.toLowerCase().includes(this.rechercheNom.toLowerCase())
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
