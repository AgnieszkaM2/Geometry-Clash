import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';
import { member } from '../_models/member';
import { User } from '../_models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: User;
  member: member;

  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService) {

   }

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  Send(): void{
    
  }

}
