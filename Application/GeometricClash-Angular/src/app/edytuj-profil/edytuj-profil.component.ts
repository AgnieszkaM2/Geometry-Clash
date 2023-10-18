import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import { User } from '../_models/user';
import { NgForm } from '@angular/forms';
import { member } from '../_models/member';
import { MembersService } from '../services/members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edytuj-profil',
  templateUrl: './edytuj-profil.component.html',
  styleUrls: ['./edytuj-profil.component.css']
})
export class EdytujProfilComponent implements OnInit {
  user: User;
  member: member
  loggedIn: boolean;
  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService, private router: Router) { this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     
    if(this.user) {
      this.loggedIn = true;
    }}

  ngOnInit(): void {
    
    this.loadMember();
    this.editProfileSuccess=false;
    this.editProfileError=false;
    this.redirecting=false;
  }

  editProfileSuccess: boolean=false;
  editProfileError: boolean=false;
  redirecting: boolean=false;

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
  updateMember() {
       this.auth.updateMember(this.member).subscribe(() => {
         console.log(this.member);
         this.editProfileSuccess=true
      })
      setTimeout(() => {
        this.redirecting=true;
      }, 5000);  //5s
     }
     redirect() {
      this.router.navigateByUrl("/profil");
  
    }

    logout() {
      this.auth.logout();
      this.loggedIn = false;
    }
  }

