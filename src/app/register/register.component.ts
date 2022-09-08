import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { User } from 'src/payloads/User';
import { TweetappService } from '../tweetapp.service';
import { ConfirmPasswordValidator } from './ConfirmPasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<any>;

  submitted: boolean = false;
  user !: User;
  notregistered: boolean = false;
  checksuccess = false;
  passwordmatch = true;
  
  
  constructor(private fb: FormBuilder, private service: TweetappService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.pattern('^[a-zA-Z]{3,}$')]],
        lastName: [""],
        username: [null,[Validators.required, Validators.pattern('^[a-z][a-zA-Z0-9]{3,}$')]],
        email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        contact!: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[7896][0-9]{9}$")]],
        password: [null, [Validators.required, Validators.pattern('^[a-z0-9A-Z]{6,}$')]],
        confirmPassword: [null, [Validators.required, Validators.pattern('^[a-z0-9A-Z]{6,}$')]]
      }
    );
   }

  ngOnInit(): void {

   
  }
  successsubmit() {
    let user = new User(this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.contact,
      this.registerForm.value.password);
    // console.log(this.registerForm.value);
    this.service.registerUser(user).subscribe(data => {
      console.log(data);
      let something = data;
      this.router.navigate(['login']);
      this.checksuccess = true;
      this.notregistered = false;
    },
      (error) => {
        this.notregistered = true;
        this.checksuccess = false;
      });
  }

  onSubmit() {
    this.submitted = true;
  
    console.log("9758375"+ this.registerForm.get('contact')?.errors)
    console.log(this.registerForm.errors);
    this.passwordmatch = true;
    if(this.registerForm.invalid){
      
    } else if (!('' + this.registerForm.value.password === '' + this.registerForm.value.confirmPassword)) {
      this.passwordmatch = false;

    }
    else {
      this.successsubmit();
    }
  }

}






