import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacksService {

  url = "http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) {}

  // methode pour packs
  ajoutProduit (packs:any): Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.post<any>('http://127.0.0.1:8000/api/createCategorieProduits',packs, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }): of (null);
  }

  // lister packs
  listerDesProduits(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/indexProduit');
  }

  // modifier packs
    updateProduit(id: number, packs:any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
      return accessToken ?
        this.http.post<any>(`http://127.0.0.1:8000/api/updateProduit/${id}`, packs, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) : of(null);}


  // supprimer un packs
  deleteProduit(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
      return accessToken ?
        this.http.delete<any>(`http://127.0.0.1:8000/api/deleteProduit/` + id, {
        headers: new HttpHeaders ({ 'Authorization': `Bearer ${accessToken}` })
      }) : of(null);}

}
