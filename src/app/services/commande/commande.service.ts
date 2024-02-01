import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Envoyer la commande à la base de données
  envoiBd(produit: any[]): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/", { produit });
  }}
