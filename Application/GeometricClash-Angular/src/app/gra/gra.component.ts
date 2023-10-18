import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';



@Component({
  selector: 'app-gra',
  templateUrl: './gra.component.html',
  styleUrls: ['./gra.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraComponent implements OnInit {

  Started = true;
  Choose = false;
  isWarrior = false;
  isMage = false;
  isArcher = false;
  levelOne = true;
  levelTwo = false;
  levelThree = false;
  loggedIn: boolean;
  user: User;
  buttonDisabled=false;
  
  constructor(private auth: AuthService) { 
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
    if(this.user) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {

  }

  button_disable(): void {
    this.buttonDisabled=true;
  }
  start_game(): void {
    this.Started = false;
    this.Choose = true;
  }
  chooseWarrior(): void {
    this.isWarrior = true;
    this.Choose = false;
  }
  chooseMage(): void {
    this.isMage = true;
    this.Choose = false;
  }
  chooseArcher(): void {
    this.isArcher = true;
    this.Choose = false;
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }

}