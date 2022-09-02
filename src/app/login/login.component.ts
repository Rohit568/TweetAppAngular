import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredential } from 'src/payloads/LoginCredential';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !:FormGroup;
  submitted: boolean = false;
  constructor(private fb : FormBuilder, private tweetAppService: TweetappService, private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ["", Validators.required],
      password : ["", Validators.required]
    });

    this.tweetAppService

  }
  authorize(){
    this.submitted = true;
    let uname = this.loginForm.value.username;
    let upass = this.loginForm.value.password;
    if(uname === "" || upass === "")
    return;
    let log  = new LoginCredential(uname, upass);
    this.tweetAppService.loginUser(log);
    this.tweetAppService.isLogin().subscribe(data =>{
      if(data.auth){
        this.router.navigate(["home"]);
      }
    });
     
  }
  

}
