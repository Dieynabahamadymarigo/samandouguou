import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) {}

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  // constructor(private http: HttpClient) {}

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

  // Méthode pour choisir le rôle
  role(userRole: any): Observable<any> {
    return this.http.post(`${this.url}/ajouterRole`, userRole);
  }

  // Méthode pour déconnecter
  deconnect(): Observable<any> {
    return this.http.post(`${this.url}/deconnect`, {}).pipe(
      tap(() => {
        // Si la déconnexion est réussie, mettez à jour l'état de l'authentification et le nom d'utilisateur
        this.isAuthenticatedSubject.next(false);
        this.userNameSubject.next('');
      })
    );
  }

  //methode pour se connecter
  // connection (users: any): Observable <any> {
  //   return this.http.post('http://127.0.0.1:8000/api/login',users);
  // }

  //methode pour choisir le role
  // role (userRole: any): Observable <any>{
  //   return this.http.post('http://127.0.0.1:8000/api/ajouterRole',userRole)
  // }

  //methode pour inscription client
  inscritClient (user: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/inscriptionClient',user)
  }

  //methode pour inscription livreur
  inscritLivreur (user: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/inscriptionlivreur',user)
  }

  //methode pour deconnecter
  // deconnect (user: any): Observable <any>{
  //   return this.http.post('http://127.0.0.1:8000/api/deconnect',user)
  // }



}
