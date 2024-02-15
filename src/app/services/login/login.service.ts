import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) {}

   isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
   userNameSubject = new BehaviorSubject<string>('');
   userSubject = new BehaviorSubject<any>('');
   userRoleSubject = new BehaviorSubject<any>('');

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();
  user$ = this.userSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();

  // constructor(private http: HttpClient) {}

  // Méthode pour se connecter
  connection(users: any): Observable<any> {
    return this.http.post(`${this.url}/login`, users).pipe(
      tap((response: any) => {
        // console.log('Réponse du serveur:', response);
        // la connexion est réussie
        this.isAuthenticatedSubject.next(true);
        this.userNameSubject.next(response.userName);
        this.userSubject.next(response.user);
      })
    );
  }

  setAuthenticationStatus(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Méthode pour choisir le rôle
  role(user:any): Observable<any> {
    return this.http.post(`${this.url}/ajouterRole`,user).pipe(
      tap((response: any) => {
        const userRole = response.role;
        this.userRoleSubject.next(userRole);
        console.log('role',userRole)
      })
    );
  }

  // role(userRole: any): Observable<any> {
  //   return this.http.post(`${this.url}/ajouterRole`, userRole);
  // }

  // Méthode pour déconnecter
  // deconnect(): Observable<any> {
  //   const accessToken = localStorage.getItem('userConnect');
  //   return accessToken ?
  //     this.http.post<any>(`http://127.0.0.1:8000/api/deconnect`,  {
  //     headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
  //   })
  //   :
  //    of(null);}



deconnect(): Observable<any> {
  const accessToken = localStorage.getItem('userConnect');

  return accessToken
    ? this.http.post<any>(`${this.url}/deconnect`, {}, {
        headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`
        }),
      })
    : of(null);
}



  // deconnect(): Observable<any> {
  //   return this.http.post(`${this.url}/deconnect`, {}).pipe(
  //     tap(() => {
  //       // la déconnexion est réussie
  //       this.isAuthenticatedSubject.next(false);
  //       this.userNameSubject.next('');
  //       console.log('deconnect', this.deconnect())
  //     })
  //   );
  // }



  // return this.http.post(`${this.url}/login`, users).pipe(
  //   tap((response: any) => {
  //     // console.log('Réponse du serveur:', response);
  //     // la connexion est réussie
  //     this.isAuthenticatedSubject.next(true);
  //     this.userNameSubject.next(response.userName);
  //     this.userSubject.next(response.user);
  //   })
  // );

  //methode pour inscription client
  inscritClient (user: any): Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/inscriptionClient',user)
  }

  //methode pour inscription livreur
  inscritLivreur (user: any): Observable <any>{
    const accessToken = localStorage.getItem('userConnect');
    return accessToken ?
      this.http.post<any>(`http://127.0.0.1:8000/api/inscriptionlivreur`,user, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    },
    ) : of(null);
  }



}
