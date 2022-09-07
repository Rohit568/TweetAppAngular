import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPojo } from 'src/payloads/EditPojo';
import { Tweet } from 'src/payloads/Tweet';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  
  message!: number;
  tweettext:string = '';
  tagtext = '';
  errormsg = '';
  texterror :boolean = false;
  textsuccess :boolean = false;
  editp !: EditPojo;
 
 constructor(private service :TweetappService, private router :Router, private route :ActivatedRoute){}

  ngOnInit(): void {

    this.service.isLogin().subscribe( data=>{
      if(!data.auth)
      this.router.navigate(["login"]);
   } );
 
   this.route.queryParams.subscribe(params =>{
      let data  = JSON.parse(params["data"]);
      this.editp = data;
      this.tweettext = this.editp.tweetText;
      this.tagtext = this.editp.tagText;
   })
  
  }
 
  updatetweet(){
   
    if(this.tweettext.length <3){
      this.errormsg = "text length should be greater than equal to 3"
      this.texterror = true;
      this.textsuccess = false;
    return ;
    }
   
    this.texterror = false;
    let username = sessionStorage.getItem('username')
    let comm:Comment[] =[];
    let newtweet = new EditPojo(this.editp.tweetId, this.tweettext, this.tagtext);
    console.log(newtweet);
    this.service.updatetweet(newtweet).subscribe(data =>{
      let str = data;
      this.textsuccess = true;
      this.router.navigate(['dashboard']);
      console.log(str);
    });

    

   
;  }
}
