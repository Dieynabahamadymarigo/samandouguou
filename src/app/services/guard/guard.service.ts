import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { PanierService } from '../panier/panier.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) { }


  canActivate(): boolean {
    if (this.authService.isAuthenticatedSubject.value) {
      // L'utilisateur est connecté, autorise l'accès à la route
      return true;
    } else {
      // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      this.router.navigate(['/connexion']);
      return false;
    }
  }

}
