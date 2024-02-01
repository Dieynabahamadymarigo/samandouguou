import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './composants/login/login.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { LegumesComponent } from './composants/recettes/legumes.component';
import { BlogComponent } from './composants/blog/blog.component';
import { ContactComponent } from './composants/contact/contact.component';
import { PacksComponent } from './composants/packs/packs.component';
import { PanierComponent } from './composants/panier/panier.component';
import { MentionLegalesComponent } from './composants/mention-legales/mention-legales.component';
import { ConditionUtilisateurComponent } from './composants/condition-utilisateur/condition-utilisateur.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { AproposComponent } from './composants/apropos/apropos.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './composants/admin/dashboard/dashboard.component';
import { HeaderdashboardComponent } from './composants/admin/headerdashboard/headerdashboard.component';
import { RecettesdashboardComponent } from './composants/admin/recettesdashboard/recettesdashboard.component';
import { CommandesdashboardComponent } from './composants/admin/commandesdashboard/commandesdashboard.component';
import { LivreursdashboardComponent } from './composants/admin/livreursdashboard/livreursdashboard.component';
import { HeaderclientComponent } from './composants/client/headerclient/headerclient.component';
import { DeconnexionclientComponent } from './composants/client/deconnexionclient/deconnexionclient.component'
import { CommandeclientComponent } from './composants/client/commandeclient/commandeclient.component';
import { ProfilclientComponent } from './composants/client/profilclient/profilclient.component';

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
    FooterComponent,
    AproposComponent,
    DashboardComponent,
    HeaderdashboardComponent,
    RecettesdashboardComponent,
    CommandesdashboardComponent,
    LivreursdashboardComponent,
    HeaderclientComponent,
    CommandeclientComponent,
    DeconnexionclientComponent,
    ProfilclientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
