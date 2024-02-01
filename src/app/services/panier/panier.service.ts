import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private produitLegumes: any[] = [];

  constructor() {}

  ajouterAuPanier(legume: any) {
    // Vérifier si le légume est déjà dans le panier
    const existingItem = this.produitLegumes.find(item => item.id === legume.id);

    if (existingItem) {
      // Si le légume est déjà dans le panier, incrémentez la quantité
      existingItem.quantity += 1;
    } else {
      // Sinon, ajoutez le légume au panier avec une quantité de 1
      this.produitLegumes.push({ ...legume, quantity: 1 });
    }

    this.updateCartInLocalStorage();
    // this.produitLegumes.push(legume);
    // this.updateCartInLocalStorage();
  }

  // methode pour décrémenter
  retirerDuPanier(legume: any) {
    // Trouver l'index du légume dans le panier
    const retireLegume = this.produitLegumes.findIndex(item => item.id === legume.id);

    if (retireLegume !== -1) {
      // Si la quantité est supérieure à 1, décrémentez la quantité
      if (this.produitLegumes[retireLegume].quantity > 1) {
        this.produitLegumes[retireLegume].quantity -= 1;
      } else {
        // Sinon, retirez complètement le légume du panier
        this.produitLegumes.splice(retireLegume, 1);
      }

      this.updateCartInLocalStorage();
    }
  }

  // passer la commande
  getLegumes() {
    return this.produitLegumes;
  }

  // efface le panier
  clearLegumes() {
    this.produitLegumes = [];
    this.updateCartInLocalStorage();
  }

  private updateCartInLocalStorage() {
    localStorage.setItem('produits', JSON.stringify(this.produitLegumes));
  }
  


}
