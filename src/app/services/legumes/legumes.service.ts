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

}
