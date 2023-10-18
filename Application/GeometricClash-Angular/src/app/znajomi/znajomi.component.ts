import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';
import { member } from '../_models/member';
import { User } from '../_models/user';

@Component({
  selector: 'app-znajomi',
  templateUrl: './znajomi.component.html',
  styleUrls: ['./znajomi.component.css']
})
export class ZnajomiComponent implements OnInit {

  userSearch: string;

  Users: any;
  member: member;
  user: User;
  loggedIn: boolean;
  friends: any;
  friendAdded: boolean;
  errorEncountered: boolean;
  errorMessage: any;
  readonly getUsersPath = this.auth.BaseURL + "/Users";
  readonly getFriendsPath = this.auth.BaseURL + "/Friends"

  constructor(private auth: AuthService, private http: HttpClient, private memberService: MembersService) {
    this.auth.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
    if(this.user) {
      this.loggedIn = true;
    }
   }

  ngOnInit(): void {
    this.getUsers();
    this.loadMember();
  }

  getUsers():any {
    this.http.get(this.getUsersPath).subscribe(response => {
      this.Users = response;
    }, error => {
      console.log(error);
    })
  }
  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.getFriends(member.id);
    })
  }
  getFriends(id) {
    this.http.get(this.getFriendsPath + "?id=" +id).subscribe(response => {
      this.friends = response;
    }, error => {
      console.log(error);
    })
  }


  search() {
    if(this.userSearch != "") {

    }else if(this.userSearch == "") {
      this.getUsers();

    }
    this.Users=this.Users.filter(res=>{
      return res.userName.toLocaleLowerCase().match(this.userSearch.toLocaleLowerCase())
    });
  }

  addFriend(friendRequestId: number) {
    let friendForm = {
      userId: this.member.id,
      friendId: friendRequestId
    }
    this.http.post(this.getFriendsPath, friendForm).subscribe(() => {
      this.friendAdded = true;
      
      
    }, error => {
      this.errorMessage = error.error;
      if(error.status === 200) {
        this.errorMessage = error.error.text;
      }
      this.errorEncountered = true;
      console.log(error)
    })
  }
  
  logout() {
    this.auth.logout();
    this.loggedIn = false;
  }

  reload() {
    window.location.reload();
  }

}
