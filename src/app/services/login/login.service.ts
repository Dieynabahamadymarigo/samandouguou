import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) {}

  //methode pour se connecter
  connection (users: any): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/api/login',users);
  }

  //methode pour choisir le role
  role (userRole: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/ajouterRole',userRole)
  }

  //methode pour inscription client
  inscritClient (user: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/inscriptionClient',user)
  }

  //methode pour inscription livreur
  inscritLivreur (user: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/inscriptionlivreur',user)
  }

  //methode pour deconnecter
  deconnect (user: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/deconnect',user)
  }



    // const accessToken = localStorage.getItem('userConnect');
    // return accessToken ?
    // {
    //   headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    // }): of(null);


  // updateDemande(id: number, demande:any): Observable<any> {

  //   const accessToken = localStorage.getItem('access_token');

  //     return accessToken ?
  //     this.http.post<any>(`${this.url}/demandes/update/${id}`, demande, {
  //       headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
  //     }) : of(null);}


}
