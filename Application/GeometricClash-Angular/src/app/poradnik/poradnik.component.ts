import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-poradnik',
  templateUrl: './poradnik.component.html',
  styleUrls: ['./poradnik.component.css']
})
export class PoradnikComponent implements OnInit {

  user: User;
  loggedIn: boolean;
  constructor(private auth: AuthService) { 
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
    if(this.user) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }

}
