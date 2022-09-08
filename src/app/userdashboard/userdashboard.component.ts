import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reply } from 'src/payloads/reply';
import { ResponseMessage } from 'src/payloads/ResponseMessage';
import { TweetR } from 'src/payloads/TweetR';
import { UserResponse } from 'src/payloads/UserResponse';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  userResponse!: UserResponse;
  showtweet: boolean = false;
  globalusername: string = '';
  tweetList: TweetR[] = [];
  showLike: boolean[] = [];
  showallcomment: boolean[] = [];
  showinput: boolean[] = [];
  commentvalue = '';
  change: boolean = false;
  newpassword: string = '';
  passwordlengthcheck = true;
  passworderrormsg = '';
  passworderror = false;
  passwordchanged = false;
  response!: ResponseMessage;
  
  constructor(private tweetService: TweetappService,private route:ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.tweetService.isLogin().subscribe( data=>{
      if(!data.auth)
      this.router.navigate(["login"]);
   } );
    this.route.params.subscribe(param=>{
        this.globalusername = param['uname'];
    })
    this.getalluserinfo(this.globalusername);
  }

  getalluserinfo(username:string) {
    this.tweetService.getalluserinfo(username).subscribe(data => {
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
    this.showtweet =true;
    location.reload();
    
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
 
  viewuserdetail(username:String){
    this.router.navigateByUrl('/userdashboard/'+username);
  }
 
}