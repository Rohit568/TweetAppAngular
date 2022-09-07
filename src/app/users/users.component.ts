import { Component, OnInit } from '@angular/core';
import { TweetappService } from '../tweetapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:String[]=[];
  showall= true;
  searchvalue:string = '';
  searchedusers:string[] =[];
  constructor(private tweetService : TweetappService, private router: Router) { }

  ngOnInit(): void {
    this.tweetService.isLogin().subscribe( data=>{
      if(!data.auth)
      this.router.navigate(["login"]);
   } );
    this.getalltheusers();
  }
  


  getalltheusers(){
    this.tweetService.getalltheusers().subscribe(data =>{
        this.users = data;
    })
  }
  searchuser(){
    this.showall = false;
    this.tweetService.searchuser(this.searchvalue).subscribe(data =>{
        this.searchedusers = data;
    })
  }

  viewuserdetail(username:String){
    this.router.navigateByUrl('/userdashboard/'+username);
  }

}
