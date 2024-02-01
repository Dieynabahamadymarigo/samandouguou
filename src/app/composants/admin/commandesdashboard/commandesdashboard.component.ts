import { Component } from '@angular/core';

@Component({
  selector: 'app-commandesdashboard',
  templateUrl: './commandesdashboard.component.html',
  styleUrls: ['./commandesdashboard.component.css']
})
export class CommandesdashboardComponent {
    // variables choix de transactions
    tabEnCours : boolean = true;
    tabConfirmer : boolean = false;
    tabRecues : boolean = false;
    tabAnnuler : boolean = false;

    //choix de transactions pour tableau en cours
    afficheLoading(){
    this.tabEnCours = true;
    this.tabConfirmer = false;
    this.tabRecues = false;
    this.tabAnnuler = false;
    }

    //choix de transactions pour tableau confirmer
    afficheConfirm(){
    this.tabEnCours = false;
    this.tabConfirmer = true;
    this.tabRecues = false;
    this.tabAnnuler = false;
    }

    //choix de transactions pour tableau recevoir
    afficheReceveid(){
    this.tabEnCours = false;
    this.tabConfirmer = false;
    this.tabRecues = true;
    this.tabAnnuler = false;
    }

    //choix de transactions pour tableau annuler
    afficheClose(){
      this.tabEnCours = false;
      this.tabConfirmer = false;
      this.tabRecues = false;
      this.tabAnnuler = true;
      }


}
