import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deconnexionclient',
  templateUrl: './deconnexionclient.component.html',
  styleUrls: ['./deconnexionclient.component.css']
})
export class DeconnexionclientComponent implements OnInit {

  ngOnInit(): void {

  }

  LoggedIn(): boolean {
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    return !!userOnline && !!userOnline.authorization;
  }

  // onLogoutClick() : void{
  //   this.authService.deconnect().subscribe(
  //     (data) => {
  //       // La déconnexion a réussi
  //       console.log('Déconnexion réussie',data);
  //       // this.connectUser : localStorage.removeItem('userConnect')
  //       // alert('deconnect')
  //       // La déconnexion est réussie
  //       localStorage.removeItem('userConnect');
  //       this.authService.setAuthenticationStatus(false);
  //       this.connectUser=false;
  //       this.deconnectUser=true;
  //       this.router.navigate(['/'])

  //     },
  //     (error) => {
  //       // Gérez les erreurs liées à la déconnexion
  //       console.error('Erreur lors de la déconnexion :', error);
  //     }
  //   );
  // }

}
