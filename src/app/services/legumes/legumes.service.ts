import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegumesService {

  url = "http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) {}

  // methode pour produits
  ajoutProduit (produit:any): Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.post<any>('http://127.0.0.1:8000/api/createProduit',produit, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }): of (null);
  }

  // lister produits
  listerDesProduits(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/indexProduit');
  }

  // modifier produit
    updateProduit(id: number, produit:any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
      return accessToken ?
        this.http.post<any>(`http://127.0.0.1:8000/api/updateProduit/${id}`, produit, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) : of(null);}


  // supprimer un produit
  deleteProduit(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
      return accessToken ?
        this.http.delete<any>(`http://127.0.0.1:8000/api/deleteProduit/` + id, {
        headers: new HttpHeaders ({ 'Authorization': `Bearer ${accessToken}` })
      }) : of(null);}

    // modifier livreur
    updateLivreur(id: number, livreur:any): Observable<any> {
      const accessToken = localStorage.getItem('userConnect');
        return accessToken ?
          this.http.post<any>(`http://127.0.0.1:8000/api/updateProduit/${id}`, livreur, {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
        }) : of(null);}


    // lister users
  listerDesUsers(): Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
      this.http.get<any>(`http://127.0.0.1:8000/api/listerClients`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
   }

    // lister livreurs
  listerDesLivreurs(): Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
      this.http.get<any>(`http://127.0.0.1:8000/api/listerLivreur`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
   };

}
