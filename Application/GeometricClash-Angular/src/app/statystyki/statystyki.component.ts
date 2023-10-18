import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-statystyki',
  templateUrl: './statystyki.component.html',
  styleUrls: ['./statystyki.component.css']
})
export class StatystykiComponent  {
  Users: any;
  stats: any;
  user: User;
  loggedIn: boolean;
  test = ["test", "test"];
  readonly getUsersPath = this.auth.BaseURL + "/Users";

  constructor(private auth: AuthService, private http: HttpClient) { 
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
    if(this.user) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
    this.getUsers();
    this.getStatistics();
  }

  getUsers():any {
    this.http.get(this.getUsersPath).subscribe(response => {
      this.Users = response;
    }, error => {
      console.log(error);
    })
  }

  getStatistics() {
    this.http.get(this.auth.getStatsPath).subscribe(response => {
      this.stats = response;
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }
}
