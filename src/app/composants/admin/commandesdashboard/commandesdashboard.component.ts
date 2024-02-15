import { LoginService } from 'src/app/services/login/login.service';
import { Component } from '@angular/core';
import { CommandeService } from 'src/app/services/commande/commande.service';
import Swal from 'sweetalert2';

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

  commandes: any[] = [];
  nomCommande: any = '';
  quantite: any = '';
  produit: any = '';
  creatAt = '';
  updateAt = '';
  userClient: any=[] ;

      constructor(private commandeService: CommandeService,private authService : LoginService) {}

      ngOnInit(): void {
      //   this.authService.user$.subscribe((user) => {
      //     this.userClient = {
      //     image: user.image,
      //     nom: user.nom,
      //     prenom: user.prenom,
      //   };
      //   console.log('Image:', this.userClient.image);
      //   console.log('Nom:', this.userClient.nom);
      //   console.log('Prenom:', this.userClient.prenom);
      // });

        this.listerDesCommandes();
        this.listeDesCommandesEnCours();
        this.listeLivreurDisponible();
      };

  viderChamps() {
    this.nomCommande = '';
    this.quantite = '';
    this.produit = '';
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

//  -----------------------------------------------------------------------------------------
  // Commandes en attentes
  // lister commandes en attentes
  tabListCommandes: any []= [];
  listerDesCommandes() {

    console.log('agezefyvdbfegvu',this.tabListCommandes);
    this.commandeService.listerCommande().subscribe((data) => {
      this.tabListCommandes = data;
      console.log('tabCommande', data);
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
      this.filteredProduit = this.tabListCommandes.filter((elt: any) =>
        elt?.nomProduit.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }

    get visibleProduits() {
      // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
      const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListCommandes;

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return sourceArray.slice(startIndex, endIndex);
    }

    totalPagesArray(): number[] {
      // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
      const sourceArray = this.filteredProduit ? this.filteredProduit : this.tabListCommandes;

      return Array.from({ length: Math.ceil(sourceArray.length / this.itemsPerPage) }, (_, i) => i + 1);
    }

    setPage(page: number) {
      // Vérifiez si la page est valide en fonction du nombre total de pages
      if (page >= 1 && page <= this.totalPagesArray().length) {
        this.currentPage = page;
      }
    }


//  -----------------------------------------------------------------------------------------
  // Commandes en cours

  //user commandes en cours
  // id:number=0;
  clientCommande(id:number) {
    this.commandeService.affecterCommande(id).subscribe((response) => {
        console.log('commandeClient', response);
        // this.listerDesProduits();

      });
  }
  // lister commandes en cours
  tabListLivreurDispo: any = [];
  listeLivreurDisponible() {

    console.log('agezefyvdbfegvu',this.tabListLivreurDispo);
    this.commandeService.listerLivreurDispo().subscribe((data) => {
      this.tabListLivreurDispo = data.data;
      console.log('tabLivreurDipo', data.data);
      
    });
  }

  // lister commandes en cours
  tabListCommandesEncours: any []= [];
  listeDesCommandesEnCours() {

    console.log('agezefyvdbfegvu',this.tabListCommandesEncours);
    this.commandeService.listerCommandeEnCours().subscribe((data) => {
      this.tabListCommandesEncours = data;
      console.log('tabCommande', data);
    });
  }

      //Pour faire la recherche
      filterCommande = '';
      filteredCommandes: any;

     itemsComPage = 6;
     currentCommande = 1;

     onSearchCommande() {
      this.currentCommande = 1; // Réinitialiser la page à 1 lorsqu'une recherche est effectuée

      // Recherche se fait selon le nom du produit
      this.filteredCommandes = this.tabListCommandesEncours.filter((elt: any) =>
        elt?.nomProduit.toLowerCase().includes(this.filterCommande.toLowerCase())
      );
    }

    get visibleCommande() {
      // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
      const sourceArray = this.filteredCommandes ? this.filteredCommandes : this.tabListCommandesEncours;

      const startIndex = (this.currentCommande - 1) * this.itemsComPage;
      const endIndex = startIndex + this.itemsComPage;

      return sourceArray.slice(startIndex, endIndex);
    }

    totalCommandeArray(): number[] {
      // Utilisez le tableau filtré si la recherche est active, sinon utilisez le tableau complet
      const sourceArray = this.filteredCommandes ? this.filteredCommandes : this.tabListCommandesEncours;

      return Array.from({ length: Math.ceil(sourceArray.length / this.itemsComPage) }, (_, i) => i + 1);
    }

    setCommande(page: number) {
      // Vérifiez si la page est valide en fonction du nombre total de pages
      if (page >= 1 && page <= this.totalCommandeArray().length) {
        this.currentCommande = page;
      }
    }





  // listerDesCommandes() {
  //   this.commandeService.listerCommandeEnCours().subscribe((data: any[]) => {
  //     this.tabListCommandes = data.map(commande => {
  //       return {
  //         ...commande,
  //         nom: commande.user? commande.user.nom : '',
  //         prenom: commande.user ? commande.user.prenom : '',
  //         image: commande.user ? commande.user.image : '',
  //       };
  //     });
  //     // console.log('commande', commande.user.nom),
  //     console.log('tabCommande', this.tabListCommandes);
  //   });
  // }


}
