import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName!:string ;
  constructor(private tweetService : TweetappService, private router : Router) { }

  ngOnInit(): void {
   this.tweetService.isLogin().subscribe(data=>{
    if(!data.auth)
    {
      this.router.navigate(['login']);
    }
   })
    this.userName = ''+sessionStorage.getItem('username');
  }

}
