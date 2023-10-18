import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatystykiComponent } from './statystyki/statystyki.component';
import { PoradnikComponent } from './poradnik/poradnik.component';
import { GraComponent } from './gra/gra.component';
import { ZnajomiComponent } from './znajomi/znajomi.component';
import { WiadomosciComponent } from './wiadomosci/wiadomosci.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthService } from './services/auth.service';
import { EdytujProfilComponent } from './edytuj-profil/edytuj-profil.component';
import { PlanszaComponent } from './plansza/plansza.component';

import { WiadomosciWyslaneComponent } from './wiadomosci-wyslane/wiadomosci-wyslane.component';
import { WyslijWiadomoscComponent } from './wyslij-wiadomosc/wyslij-wiadomosc.component';

import { ChatComponent } from './chat/chat.component';


import { LoginComponent } from './login/login.component';

export function socialConfigs() {
  const config: SocialAuthServiceConfig = {
    providers: [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('503644940767811')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('502592018393-9unm53s9900opo9qnmipre1653pm77bh.apps.googleusercontent.com')
      }
    ]
  };

  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatystykiComponent,
    PoradnikComponent,
    GraComponent,
    ZnajomiComponent,
    WiadomosciComponent,
    LogowanieComponent,
    RejestracjaComponent,
    UstawieniaComponent,
    ProfilComponent,
    EdytujProfilComponent,
    PlanszaComponent,
    WiadomosciWyslaneComponent,
    WyslijWiadomoscComponent,
    ChatComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService, SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }