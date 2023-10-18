import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {

  
  loginForm: FormGroup;
  loginStatus: boolean=false;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    
    this.loginForm = this.fb.group({
      'username': [''],
      'password': ['']})
  }

  ngOnInit(): void {

  }

  get username() {
    return this.loginForm.get('username')
    
  }

  get password() {
    return this.loginForm.get('password')
    
  }

  

login() {
    let loginData = {
      
      UserName: this.loginForm.value.username,
      Password: this.loginForm.value.password
    };
    console.log(loginData.UserName);
    this.authService.login(loginData).subscribe(
      data => {
      console.log(data); 
      this.loginStatus=true;
    },
    (res: any) =>{
      if (Error) {
        this.loginError=true;
      }
      else {
        console.log(res)
        

      }
      
    })
    
  }

  logout() {
    this.authService.logout();
    this.loginStatus = false;
  }

  goBack(): void {
    this.loginError=false;
  }

  

}