import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private produitLegumes: any[] = [];

  url = 'http://localhost:8000/api';
  public readonly prixLivraion = 2000;
  // url: any;

  constructor(private router: Router, private http: HttpClient) {}

  // auth avant de commander
  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

   isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

    // Méthode pour se connecter
    connection(users: any): Observable<any> {
      return this.http.post(`${this.url}/login`, users).pipe(
        tap((response: any) => {
          // Si la connexion est réussie, mettez à jour l'état de l'authentification et le nom d'utilisateur
          this.isAuthenticatedSubject.next(true);
          this.userNameSubject.next(response.userName); // Assurez-vous que votre API renvoie le nom d'utilisateur
        })
      );
    }

    setAuthenticationStatus(isAuthenticated: boolean) {
      this.isAuthenticatedSubject.next(isAuthenticated);
    }

    // panierSize: number = 0;
    // cart: any ;
    // getCart(): any[] {
    //     return this.cart;
    //   }

  // incremente panier
  private incrementePanier = new BehaviorSubject<number>(0);
  iconePanier$ = this.incrementePanier.asObservable();

  updateIncrementePanier(count: number) {
    this.incrementePanier.next(count);
    // this.incrementePaniercount;
  }


  post(path: string, dataToSend: any, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.post(this.url + path, dataToSend, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }

  simplePost(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.post(this.url + path, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }
  get(path: string, onSuccess: Function) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("onlineUser") ?? '{}').token
      })
    };
    this.http.get(this.url + path, httpOptions).subscribe((reponse: any) => onSuccess(reponse));
  }

  message(title: any, icon: any, message: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon
    });
  }

  ajouterAuPanier(legume: any, quantite = 1) {
    let panier = this.getPanier();

    let existingProduct = panier.find((item: any) => item.produit.id === legume.id);

    if (existingProduct) {
      // Le produit existe déjà dans le panier, informer l'utilisateur ou mettre à jour la quantité
      this.message("Oops", "warning", "Ce produit existe déjà dans le panier");
    } else {
      // Le produit n'existe pas dans le panier, l'ajouter
      let produitPanier = {
        produit: legume,
        quantitePanier: quantite
      };

      panier.push(produitPanier);
      localStorage.setItem('panier', JSON.stringify(panier));
      this.message("Parfait", "success", "Produit ajouté au panier");
      this.router.navigate(['/panier']);

    }
  }



  incrementerQuantite(legume: any) {
    let panier = this.getPanier();

    let existingProduct = panier.find((item: any) => item.produit.id === legume.id);

    if (existingProduct) {
      // Le produit existe déjà dans le panier, augmenter ou diminuer la quantité
      existingProduct.quantitePanier += 1;
      console.log('quantite', existingProduct);
      if (existingProduct.quantitePanier < 1) {
        existingProduct.quantitePanier = 1;
      }
      localStorage.setItem('panier', JSON.stringify(panier));

      // Mettre à jour la référence du tableau pour déclencher la mise à jour de l'interface utilisateur
      // this.panier = [...panier];

      this.message("Parfait", "success", "Quantité du produit mise à jour dans le panier");
    }
    // else {
    //   this.message("Oops", "warning", "Ce produit n'existe pas dans le panier");
    // }
  }

  private getPanier(): any[] {
    return JSON.parse(localStorage.getItem('panier') || '[]');
  }



  getFromPanier() {
    return JSON.parse(localStorage.getItem('panier') ?? '[]');
  }



  // methode pour décrémenter
  // retirerDuPanier(legume: any) {
  //   const retireLegume = this.produitLegumes.findIndex(item => item.id === legume.id);

  //   if (retireLegume !== -1) {
  //     if (this.produitLegumes[retireLegume].quantity > 1) {
  //       this.produitLegumes[retireLegume].quantity -= 1;
  //     } else {
  //       this.produitLegumes.splice(retireLegume, 1);
  //     }

  //     this.updateCartInLocalStorage();
  //   }
  // }

  // passer la commande
  getLegumes() {
    return this.produitLegumes;
  }




}
