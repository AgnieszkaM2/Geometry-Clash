import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { member } from '../_models/member';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMembers() {
    return this.http.get<member[]>(this.auth.getUsersPath);
  }

  getMember(username: string) {
    return this.http.get<member>(this.auth.getUsersPath + '/' + username);
  }
}
