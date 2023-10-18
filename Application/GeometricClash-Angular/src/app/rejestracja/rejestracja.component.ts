import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.required, Validators.minLength(4), Validators.maxLength(20)],
      'email': ['', Validators.required, Validators.email, Validators.maxLength(50)],
      'password': ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      'passwordConfirm': ['', Validators.required]},
       {validator: this.MustMatch('password', 'passwordConfirm')})
  }

 
  get username() {
    return this.registerForm.get('username')
    
  }

  get email() {
    return this.registerForm.get('email')
    
  }

  get password() {
    return this.registerForm.get('password')
    
  }
  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm')
    
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordMismatch: true });
        } else {
            matchingControl.setErrors(null);
            
        }
        if (matchingControl.errors && !matchingControl.errors.passwordMismatch) {
            // other validators error
            return;
        }
    }
  }
  registerStatus: boolean=false;
  registerError: boolean=false;

  register() {
    let registerData = {
      UserName: this.registerForm.value.username,
      Password: this.registerForm.value.password,
      Email: this.registerForm.value.email,
    };
    this.authService.register(registerData).subscribe(
      data => {
      console.log(data); 
      this.registerStatus=true;
    },
    (res: any) =>{
      if (Error) {
        this.registerError=true;
      }
      else {
        console.log(res)
        

      }
      
    })
    /*console.log(this.registerForm.value);*/
    
  }
  goBack(): void {
    this.registerError=false;
  }
  
  ngOnInit(){};
  
}
