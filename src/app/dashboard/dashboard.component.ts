import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ChangePassword } from 'src/payloads/ChangePassword';
import { Reply } from 'src/payloads/reply';
import { ResponseMessage } from 'src/payloads/ResponseMessage';
import { TweetR } from 'src/payloads/TweetR';
import { TweetResponse } from 'src/payloads/TweetResponse';
import { UserResponse } from 'src/payloads/UserResponse';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userResponse!: UserResponse;
  showtweet: boolean = false;
  tweetList: TweetR[] = [];
  showLike: boolean[] = [];
  showallcomment: boolean[] = [];
  showinput: boolean[] = [];
  commentForm!: FormGroup;
  commentvalue = '';
  change: boolean = false;
  newpassword: string = '';
  passwordlengthcheck = true;
  passworderrormsg = '';
  passworderror = false;
  passwordchanged = false;
  response!: ResponseMessage;
  constructor(private tweetService: TweetappService, private router: Router) { }


  ngOnInit(): void {
    this.tweetService.isLogin().subscribe( data=>{
      if(!data.auth)
      this.router.navigate(["login"]);
   } );
  
    this.getalluserinfo();
  }

  getalluserinfo() {
    this.tweetService.getalluserinfo().subscribe(data => {
      this.userResponse = data;
      console.log(this.userResponse);
      this.tweetList = this.userResponse.tweetResponse;
    })
  }
  showposts() {
    this.showtweet = !this.showtweet;
  }
  showandhidelike(i: number) {
    this.showLike[i] = !this.showLike[i];
    if (this.showallcomment[i]) {
      this.showallcomment[i] = false;
      this.showinput[i] = false;
    }
  }
  showandhidecomment(i: number) {
    this.showallcomment[i] = !this.showallcomment[i];
    if (this.showLike[i] || this.showinput[i]) {
      this.showLike[i] = false;
      this.showinput[i] = false;
    }
  }
  liketweet(i: number) {
    let id = this.tweetList[i].tweetId;
    this.tweetService.liketweet(id).subscribe(data => {

    })

  }

  showinputt(i: number) {
    this.showinput[i] = !this.showinput[i];
    if (this.showLike[i] || this.showallcomment[i]) {
      this.showLike[i] = false;
      this.showallcomment[i] = false;
    }

  }

  submitcomment(i: number) {
    this.showinput[i] = false;
    let id = this.tweetList[i].tweetId;
    console.log(this.commentvalue)
    let reply = new Reply(this.commentvalue, 'photo is not available');
    this.tweetService.submitcomment(id, reply).subscribe(data => {

    });

  }
  edittweet(i: number) {

  }
  deletetweet(i: number) {
    let id = this.tweetList[i].tweetId;
    console.log(this.tweetList);
    console.log(id);
    this.tweetService.deletetweet(id).subscribe(data => {

    });
    this.getalluserinfo();
  }
  showpasswordinput() {
    this.change = true;
  }
  changepassword() {
    this.passwordlengthcheck = true;
    if (this.newpassword.length < 6) {
      this.passwordlengthcheck = false;
      this.passwordchanged= false;
      this.passworderrormsg = "password length should be atleast 6"
      return;
    }
    let newPass = new ChangePassword(this.newpassword);
    this.tweetService.changepassword(newPass).subscribe(data => {
        console.log(data);
        this.passwordchanged = true;
        this.passworderror = false;
        this.passwordlengthcheck = false;
    },
      (error) => {
        console.log(error);
        this.passworderrormsg = "something is wrong."
        this.passworderror = true;
      })
  }

}
