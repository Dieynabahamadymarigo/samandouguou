import { HttpClient, HttpHeaders, withInterceptors } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

    // methode pour ajouter commande
    submitCommande (commande:any): Observable<any> {
      const accessToken = localStorage.getItem('userConnect');
      console.log('client', commande)
      return accessToken ?
      this.http.post<any>('http://127.0.0.1:8000/api/createCommande',commande, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
      }): of (null);
    }

    // statut du livreur
    stautLivreur (livreur:any): Observable<any> {
      const accessToken = localStorage.getItem('userConnect');
      console.log('livreur', livreur)
      return accessToken ?
      this.http.post<any>('http://127.0.0.1:8000/api/changerStatut',livreur, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
      }): of (null);
    }


    // liste commande en attente
  listerCommande(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/listeCommandeEnAttente`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }


  // Affecter une commande en cours à un livreur
  affecterCommande(id:number):Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    console.log('token',accessToken)
    return accessToken ?
    this.http.post(`http://127.0.0.1:8000/api/affecterLivreur/${id}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`}),
    }): of (null);
  }

  // Affecter une commande en cours à un livreur
  commandeTerminer(id:number):Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    console.log('token',accessToken)
    return accessToken ?
    this.http.post(`http://127.0.0.1:8000/api/CommandeTerminee/${id}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`}),
    }): of (null);
  }


   // liste commande en cours
   listerCommandeEnCours():Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/listeCommandeEnCours`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

   // liste commande affectees a un livreur
   listerCommandeAffecteLivreur():Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/ListerCommandeAffecter`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

   // liste livreur dispo
   listerLivreurDispo():Observable<any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/listerLivreursDisponible`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

  // liste des commandes d'un user
  listerCommandeUser(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
    this.http.get(`http://127.0.0.1:8000/api/indexCommande`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}`})
    }): of (null);
  }

}
