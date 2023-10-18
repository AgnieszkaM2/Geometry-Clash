import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';
import { member } from '../_models/member';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wyslij-wiadomosc',
  templateUrl: './wyslij-wiadomosc.component.html',
  styleUrls: ['./wyslij-wiadomosc.component.css']
})
export class WyslijWiadomoscComponent implements OnInit {
  user: User;
  member: member;
  messageForm: FormGroup;
  getMessagesPath = this.auth.BaseURL + "/Messages";
  loggedIn: boolean;
  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService, private fb: FormBuilder, private router: Router)
   {
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
    if(this.user) {
      this.loggedIn = true;
    }
    this.messageForm = this.fb.group({
      'receiver': [''],
      'text': ['']});
  }
  get receiver() {
    return this.messageForm.get('receiver')
    
  }

  get text() {
    return this.messageForm.get('text')
    
  }
  ngOnInit(): void {
    
    this.loadMember();
    this.sendMessageSuccess=false;
    this.sendMessageError=false;
    this.redirecting=false;
  }
  sendMessageSuccess: boolean=false;
  sendMessageError: boolean=false;
  redirecting: boolean=false;

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
  sendMessage() {
    let messageData = {
      sender: this.member.id,
      receiver: this.messageForm.value.receiver,
      text: this.messageForm.value.text
    }
    this.http.post(this.getMessagesPath, messageData).subscribe(
      () => {console.log("sukces!");
      this.sendMessageSuccess=true
    }, error =>{
    console.log(error);
    this.sendMessageError=true;
    })
    setTimeout(() => {
      this.redirecting=true;
    }, 5000);  //5s
  }
  redirect() {
    this.router.navigateByUrl("/wiadomosci");

  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }
}
