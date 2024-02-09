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
      userRole: string = '';

      // le survol du profil
      showDropdown: boolean = false;


      constructor (private router: Router,private panierService : PanierService , private authService : LoginService, private cdr: ChangeDetectorRef){}

      ngOnInit(): void {
           // S'abonner aux observables pour mettre à jour les propriétés du composant en fonction de l'état d'authentification
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        this.connectUser = isAuthenticated;
        console.log('user',this.connectUser)
        // this.quantitePanier = this.panierService.ajouterAuPanier(this);
      });

      this.authService.userName$.subscribe((userName) => {
        this.userName = userName;
      });

      this.authService.userRole$.subscribe((userRole) => {
        this.userRole = userRole;
      });


      // this.panierSize = this.panierService.getCart().reduce((total, item) => total + item.quantity, 0);
      // this.panierService.iconePanier$.subscribe((cart) => {
      //   this.panierSize = cart.reduce((total, item) => total + item.quantity, 0);
      // });

      // Mettez à jour le nombre d'articles lorsque le panier change
    this.panierService.iconePanier$.subscribe((count) => {
      this.nbpanier = count;
      this.cdr.detectChanges();
    });
    this.onLoginClick();
      }

     // effet de survol quand l'utilisateur se connect
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      }
      // navigateToProfile() {
        //naviguer vers la page de profil
      //   this.router.navigate(['/client']);
      //   console.log('Naviguer vers le profil');
      // }

      // navigateToProfile() {
      //   if (!this.connectUser) {
      //     this.authService.role(this.connectUser).subscribe((userRole) => {

      //       this.authService.userRoleSubject.next(userRole);

      //       if(userRole.role_id=='1'){
      //         this.router.navigate(['/admin']);
      //         alert('voux etes admin')
      //       }
      //       else if (userRole.role_id=='2')
      //       {
      //         this.router.navigate(['/client']);
      //         alert('voux etes client')
      //       }
      //       else
      //       {
      //         this.router.navigate(['/livreur']);
      //       alert('voux etes livreur')
      //     }

      //       this.router.navigate([userRole]);
      //       console.log('Naviguer vers le profil',userRole);
      //     });
      //   }
      // }



      // Gérer la déconnexion
      // if (this.connectUser) {
      onLoginClick() {
          this.authService.deconnect().subscribe(() => {
            this.router.navigate(['/accueil']);
            // alert ('deconnecter');
            console.log('deconnect',this.connectUser)
          });
        // } else {}
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
        this.panierService.updateIncrementePanier(this.nbpanier);
        // this.cdr.detectChanges();
        console.log('nombbre',this.nbpanier)
        // console.log('Nombre de produits dans le panier :', this.nbpanier);

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
