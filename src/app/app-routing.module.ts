import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ContactComponent } from './composants/contact/contact.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { HeaderComponent } from './composants/header/header.component';
import { ConditionUtilisateurComponent } from './composants/condition-utilisateur/condition-utilisateur.component';
import { MentionLegalesComponent } from './composants/mention-legales/mention-legales.component';
import { LoginComponent } from './composants/login/login.component';
import { FooterComponent } from './composants/footer/footer.component';
import { AproposComponent } from './composants/apropos/apropos.component';
import { PacksComponent } from './composants/packs/packs.component';
import { LegumesComponent } from './composants/recettes/legumes.component';
import { DashboardComponent } from './composants/admin/dashboard/dashboard.component';
import { HeaderdashboardComponent } from './composants/admin/headerdashboard/headerdashboard.component';
import { CommandesdashboardComponent } from './composants/admin/commandesdashboard/commandesdashboard.component';
import { LivreursdashboardComponent } from './composants/admin/livreursdashboard/livreursdashboard.component';
import { RecettesdashboardComponent } from './composants/admin/recettesdashboard/recettesdashboard.component';
import { ProfilclientComponent } from './composants/client/profilclient/profilclient.component';
import { HeaderclientComponent } from './composants/client/headerclient/headerclient.component';
import { CommandeclientComponent } from './composants/client/commandeclient/commandeclient.component';
import { PanierComponent } from './composants/panier/panier.component';
import { GuardService } from './services/guard/guard.service';
import { DashLivreurComponent } from './livreur/dash-livreur/dash-livreur.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CardPaginationComponent } from './card-pagination/card-pagination.component';
// import { DeconnexionclientComponent } from './composants/client/deconnexionclient/deconnexionclient.component';

const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path:'contact', component: ContactComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'condition', component:ConditionUtilisateurComponent},
  {path: 'mention', component:MentionLegalesComponent},
  {path: 'connexion', component:LoginComponent},
  {path: 'foter', component:FooterComponent},
  {path: 'a propos', component:AproposComponent},
  {path: 'packs', component:PacksComponent},
  {path: 'packs/decouvrir', component:CardPaginationComponent},
  {path: 'panier', component:PanierComponent},
  {path: 'recettes', component:LegumesComponent},
  // {path: 'admin', component:DashboardComponent},
  {path: 'admin', component:DashboardComponent, canActivate: [GuardService]},
  {path: 'admin/recettes', component:RecettesdashboardComponent},
  {path: 'admin/commandes', component:CommandesdashboardComponent},
  {path: 'admin/livreurs', component:LivreursdashboardComponent},
  {path: 'client', component:ProfilclientComponent, canActivate: [GuardService]},
  {path: 'client/commande', component:CommandeclientComponent},
  // {path: 'livreur', component:DashLivreurComponent},
  {path: 'livreur', component:DashLivreurComponent,canActivate: [GuardService]},




  {path: 'error', component:MaintenanceComponent},

  // {path: 'client', component:HeaderclientComponent},
  // {path: 'client/deconnecter', component:DeconnexionclientComponent},
  // canActivate: [MonGarde],
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
