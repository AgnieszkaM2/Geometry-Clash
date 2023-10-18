import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';
import { member } from '../_models/member';
import { User } from '../_models/user';

@Component({
  selector: 'app-wiadomosci-wyslane',
  templateUrl: './wiadomosci-wyslane.component.html',
  styleUrls: ['./wiadomosci-wyslane.component.css']
})
export class WiadomosciWyslaneComponent implements OnInit {

  messages: any;
  user: User;
  member: member;
  getMessagesPath: string;
  loggedIn: boolean;
  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService) {
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    if(this.user) {
      this.loggedIn = true;
    }
    
   }

  ngOnInit(): void {
    this.loadMessages();
    
    
  }

  getMessages(){
      this.http.get(this.getMessagesPath).subscribe(response => {
        this.messages = response;
      }, error => {
        console.log(error);
      }) 
  }
  loadMessages() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.getMessagesPath = this.auth.BaseURL + "/Messages/Sent?id=" + member.id.toString();
      this.getMessages();
    })
  }
  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }
}
