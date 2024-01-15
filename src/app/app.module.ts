import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './composants/login/login.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { LegumesComponent } from './composants/legumes/legumes.component';
import { BlogComponent } from './composants/blog/blog.component';
import { ContactComponent } from './composants/contact/contact.component';
import { PacksComponent } from './composants/packs/packs.component';
import { PanierComponent } from './composants/panier/panier.component';
import { MentionLegalesComponent } from './composants/mention-legales/mention-legales.component';
import { ConditionUtilisateurComponent } from './composants/condition-utilisateur/condition-utilisateur.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    LegumesComponent,
    BlogComponent,
    ContactComponent,
    PacksComponent,
    PanierComponent,
    MentionLegalesComponent,
    ConditionUtilisateurComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
