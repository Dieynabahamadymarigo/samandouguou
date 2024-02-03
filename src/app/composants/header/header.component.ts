import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //
  // quantitePanier: any ;


      // variable pour gérer la déconnexion
      connectUser: boolean = false;
      userName: string = '';

      constructor (private router: Router,private panierService : PanierService , private authService : LoginService, private cdr: ChangeDetectorRef){}

      ngOnInit(): void {
           // S'abonner aux observables pour mettre à jour les propriétés du composant en fonction de l'état d'authentification
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        this.connectUser = isAuthenticated;
        // this.quantitePanier = this.panierService.ajouterAuPanier(this);
      });

      this.authService.userName$.subscribe((userName) => {
        this.userName = userName;
      });
      }

      onLoginClick() {
        if (this.connectUser) {
          // Gérer la déconnexion
          this.authService.deconnect().subscribe(() => {
            this.router.navigate(['/']);
            alert ('deconnecter')
          });
        } else {}
      }

  public quantite = 1;
  public nbpanier=0;


// increment et dés-increment
      upOrDownQuantity(type: string, id: any) {
        let panierProduit = this.panierService.getFromPanier();
        panierProduit.forEach((element: any) => {
          // console.log('ajout', panierProduit)
          if (element.produit.id == id) {
            if (type == 'up') {
              this.quantite++;
              element.quantitePanier++;
              if (element.quantitePanier>element.produit.quantite) {
                element.quantitePanier--;
                this.panierService.message("Oops","warning",`il n'en reste que ${element.produit.quantite} produit en stock`);
              }
            } else {
              // this.quantite--;
              element.quantitePanier--;
              if (element.quantitePanier < 1) {
                element.quantitePanier = 1;
              }
            }
          }
        });
        // this.quantiteProduit = nouvelleQuantiteProduit;
        localStorage.setItem("panier", JSON.stringify(panierProduit));
        this.totalProduit();
        this.panier = this.panierService.getFromPanier();
        this.nbpanier= panierProduit.length;
        this.cdr.detectChanges();
        console.log('nombbre',this.nbpanier)
        console.log('Nombre de produits dans le panier :', this.nbpanier);

      }

      public panier: any = [];
      public nombreLegumes = 0;
      public sommeLegumes = 0;
      public prixLivraion = this.panierService.prixLivraion;

      totalProduit() {
        this.nombreLegumes = 0;
        this.sommeLegumes = 0;
        let panierProduit = this.panierService.getFromPanier();
        panierProduit.forEach((element: any) => {
        this.nombreLegumes += element.quantitePanier;
        this.sommeLegumes += element.quantitePanier * element.produit.prix;
        });
        console.log('total',this.totalProduit)

      }
}
