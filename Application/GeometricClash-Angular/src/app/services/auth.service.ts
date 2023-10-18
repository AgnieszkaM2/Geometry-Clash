import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { member } from '../_models/member';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BaseURL= environment.BaseURL;
  

  readonly getHeroesPath = this.BaseURL + "/Heroes";
  readonly getStatsPath = this.BaseURL + "/Stats";
  readonly getHeroStatsPath = this.BaseURL + "/HeroStats";
  readonly getUsersPath = this.BaseURL + "/Users";
  private registerPath = this.BaseURL + "/Account/register";
  private loginPath = this.BaseURL + "/Account/login";
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  /*private registerPath = environment.apiUrl + "identity/register";*/


  constructor(private http: HttpClient) { }
  

   register(data): Observable<any> {
    return this.http.post(this.registerPath, data)
  }

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  updateMember(member: member) {
    return this.http.put(this.getUsersPath, member);
  }
}
