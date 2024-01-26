import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path: 'recettes', component:LegumesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
