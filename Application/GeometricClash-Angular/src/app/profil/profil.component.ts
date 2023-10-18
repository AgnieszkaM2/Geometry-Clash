import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';
import { NgForm } from '@angular/forms';
import { member } from '../_models/member';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User;
  member: member
  loggedIn: boolean;
  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService) {
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    if(this.user) {
      this.loggedIn = true;
    }
  
  }

  ngOnInit(): void {
   if (this.loggedIn) {
    this.loadMember();
   }
    

  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {

  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }
}
