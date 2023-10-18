import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { EdytujProfilComponent } from './edytuj-profil/edytuj-profil.component';
import { WiadomosciWyslaneComponent } from './wiadomosci-wyslane/wiadomosci-wyslane.component';
import { WyslijWiadomoscComponent } from './wyslij-wiadomosc/wyslij-wiadomosc.component';


import { ChatComponent } from './chat/chat.component';

  
import { LoginComponent } from './login/login.component'; 


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'statystyki', component: StatystykiComponent },
  { path: 'poradnik', component: PoradnikComponent },
  { path: 'gra', component: GraComponent },
  { path: 'znajomi', component: ZnajomiComponent },
  { path: 'wiadomosci', component: WiadomosciComponent },
  { path: 'wiadomosci/wyslane', component: WiadomosciWyslaneComponent },
  { path: 'wiadomosci/wyslij', component: WyslijWiadomoscComponent },
  { path: 'logowanie', component: LogowanieComponent },
  { path: 'rejestracja', component: RejestracjaComponent },
  { path: 'ustawienia', component: UstawieniaComponent },
  { path: 'profil', component: ProfilComponent },

  { path: 'edytuj-profil', component: EdytujProfilComponent },
  { path: 'chat', component: ChatComponent },

  { path: 'login', component: LoginComponent,    
    data: { title: 'Login Page' }    
  },          

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
