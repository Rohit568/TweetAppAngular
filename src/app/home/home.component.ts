import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TweetResponse } from 'src/payloads/TweetResponse';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  tweets = [];
  constructor(private  tweetService :TweetappService, private router:Router ) { }
 
  ngOnInit(): void {
    this.tweetService.isLogin().subscribe( data=>{
       if(!data.auth)
       this.router.navigate(["/login"]);
    } );

    this.getalltweets();
  }
  getalltweets(){
    this.tweetService.getalltweets().subscribe(data =>{
       
       this.tweets = data;
    })
  }

}
