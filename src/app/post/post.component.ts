import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/payloads/Tweet';
import { TweetResponse } from 'src/payloads/TweetResponse';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
 
  newtweet!: FormGroup;
  message!: number;
  tweettext:string = '';
  tagtext = '';
  errormsg = '';
  texterror :boolean = false;
  textsuccess :boolean = false;
 
 constructor(private service :TweetappService, private router :Router){}

  ngOnInit(): void {

    this.service.isLogin().subscribe( data=>{
      if(!data.auth)
      this.router.navigate(["login"]);
   } );
  
  }
 
  addtweet(){
   
    if(this.tweettext.length <3){
      this.errormsg = "text length should be greater than equal to 3"
      this.texterror = true;
      this.textsuccess = false;
    return ;
    }
    this.textsuccess = true;
    this.texterror = false;
    let username = sessionStorage.getItem('username')
    let comm:Comment[] =[];
    let tweet: Tweet = new Tweet(this.tweettext, this.tagtext);
    console.log(tweet);
    this.service.posttweet(tweet).subscribe(data =>{
      let str = data;
      console.log(str);
    })
;  }
}
  









