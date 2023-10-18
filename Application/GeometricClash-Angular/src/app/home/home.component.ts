import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';
import { member } from '../_models/member';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  globalChat: any;
  user: User;
  member: member;
  loggedIn: boolean;
  messageform: FormGroup;
  messageCount: any;

  
  readonly getUnreadMessagePath = this.auth.BaseURL + "/Messages/Unread";
  readonly getGlobalChatPath = this.auth.BaseURL + "/GlobalChat";

  constructor(private http: HttpClient, private auth: AuthService, private memberService: MembersService, private fb: FormBuilder) {
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
    if(this.user) {
      this.loggedIn = true;
    }
    this.messageform = this.fb.group({
      'userId': [''],
      'message': ['', Validators.required]})
  }
  get message() {
    return this.messageform.get('message');
  }
  ngOnInit(): void {
    this.getGlobalChat();
    this.loadMember();
   // this.getUnreadMessageCount();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.getUnreadMessageCount();
    })
  }

  getGlobalChat():any {
    this.http.get(this.getGlobalChatPath).subscribe(response => {
      this.globalChat = response;
    }, error => {
      console.log(error);
    })
  }

  sendChatMessage() {
    let messageData = {
      userId: this.member.id,
      message: this.messageform.value.message
    }
    if (messageData.message !== "")
    {
      console.log(messageData);
      this.http.post(this.getGlobalChatPath, messageData).subscribe( () => {console.log("sukces!")
    }, error =>{
    console.log(error);
    })
    delay(3000)
    window.location.reload();
    }
    
  }

  getUnreadMessageCount() {
    this.http.get(this.getUnreadMessagePath + "?id=" + this.member.id).subscribe(response => {
      this.messageCount = response;
    })
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }
}
