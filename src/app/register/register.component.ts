import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  submitted : boolean = false;
  user !:User;
  notregistered :boolean = false;
  checksuccess = false;
  constructor(private fb :FormBuilder, private service : TweetappService) { }
  
  ngOnInit(): void {

    this.registerForm = this.fb.group(
      {
        firstName:["", Validators.required],
        lastName : [""],
        username :["", Validators.required],
        email: ["",[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        contact:["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  onSubmit():void{
     this.submitted = true;
     if(this.submitted)
      this.notregistered = false;
      if(this.registerForm.value.firstName ==='' || this.registerForm.value.username===''||
      this.registerForm.value.email === '' || this.registerForm.value.password === ''){
        this.notregistered= true;
      }
      
      let user= new User(this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.username, 
      this.registerForm.value.email,
      this.registerForm.value.contact,
      this.registerForm.value.password);
     // console.log(this.registerForm.value);
      this.service.registerUser(user).subscribe(data=>{
        console.log(data);
         let something = data;
         
         this.checksuccess = true;
         this.notregistered = false;
      },
      (error)=>{
        this.notregistered = true;
        this.checksuccess = false;
      });

    }
   
   

}
 
