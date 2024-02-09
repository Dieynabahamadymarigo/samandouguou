import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // liste des commandes
  // submitCommande(listeCommande: any): Observable<any> {
  //   const accessToken = localStorage.getItem('userConnect');
  //   return accessToken ?
  //   this.http.post<any>('http://127.0.0.1:8000/api/indexCommande',listeCommande, {
  //     headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
  //   }): of (null);
  // }
  // return this.http.get<any>(`${this.url}/ ajouterAuPanier`, listeCommande);

  // lister commandes
  submitCommande(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/listeCommandeEnAttente  ');
  }

}
