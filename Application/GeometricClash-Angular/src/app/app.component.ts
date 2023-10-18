import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GeometricClash';
  users: any;
  heroes: any;
  heroStats: any;
  stats: any;
  user: any;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    //this.getUsers();
    this.getHeroes();
    this.getHeroStats();
    this.getStatistics();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.auth.setCurrentUser(user);
  }

  getHeroStats() {
    this.http.get(this.auth.getHeroStatsPath).subscribe(response => {
      this.heroStats = response;
    }, error => {
      console.log(error);
    })
  }

  getHeroes() {
    this.http.get(this.auth.getHeroesPath).subscribe(response => {
      this.heroes = response;
    }, error => {
      console.log(error);
    })
  }
  getUsers() {
    this.http.get(this.auth.getUsersPath).subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
  getUser() {
    this.http.get(this.auth.getUsersPath).subscribe(response => {
      this.users = response;
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
}
