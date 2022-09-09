import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reply } from 'src/payloads/reply';
import { Tag } from 'src/payloads/Tag';
import { TweetResponse } from 'src/payloads/TweetResponse';
import { TweetappService } from '../tweetapp.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

 
  tweetList:TweetResponse[] = [];
  tweetList2:TweetResponse[] = [];
  showLike: boolean[] = [] ;
  showallcomment:boolean[] = [] ;
  showinput:boolean[] = [];
  commentForm!:FormGroup;
  commentvalue='';
  tagvalue ='';
  showsearch=false;
  iszero = false;
  tagstring:any[]=[];
    constructor(private route :ActivatedRoute, private fb : FormBuilder,private  tweetService :TweetappService, private router:Router ) { }
 
  ngOnInit(): void {
    this.tweetService.isLogin().subscribe( data=>{
       if(!data.auth)
       this.router.navigate(["login"]);
    } );
    this.route.params.subscribe(param =>{
       this.tagvalue = param['tag'];
    })
    this.searchtag();

    
  }
  searchtag(){
   
    this.iszero = false;
    let tag = new Tag(this.tagvalue);
    this.tweetService.gettagtweets(tag).subscribe(data =>{
       //console.log(data);
      
       this.tweetList = data;
       if(this.tweetList.length == 0){
        this.iszero = true;
      }
       console.log(this.tweetList);
       
    }, (error) =>{
      this.router.navigate(['/login']);
    });
  
    for(let i = 0; i<this.tweetList.length;i++){
    this.showLike.push(false);
    this.showallcomment.push(false);
    this.showinput.push(false);
   
    }
    console.log(this.tagstring );
    
  }

  functionarr(val:string):string[]{
     let str = val.split(" ");
     return str;
  }
  searchtag2(val:string){
   
    this.iszero = false;
    this.tagvalue = val;
    let tag = new Tag(this.tagvalue);
    this.tweetService.gettagtweets(tag).subscribe(data =>{
       //console.log(data);
      
       this.tweetList = data;
       if(this.tweetList.length == 0){
        this.iszero = true;
      }
       console.log(this.tweetList);
       
    }, (error) =>{
      this.router.navigate(['/login']);
    });
  
    for(let i = 0; i<this.tweetList.length;i++){
    this.showLike.push(false);
    this.showallcomment.push(false);
    this.showinput.push(false);
   
    }
    console.log(this.tagstring );
    
  }
  
  // getalltweets(){
  //   this.iszero =false;
  //   this.tweetService.getalltweets().subscribe(data =>{
  //      //console.log(data);
      
  //      this.tweetList = data;
       
  //      console.log(this.tweetList);
       
  //   }, (error) =>{
  //     this.router.navigate(['/login']);
  //   });
    
  //   for(let i = 0; i<this.tweetList.length;i++){
  //   this.showLike.push(false);
  //   this.showallcomment.push(false);
  //   this.showinput.push(false);
   
  // //   let arr= this.tweetList[i].tagText.split(" ");
  // //  // this.tagstring.push([]);
  // //   this.tagstring[i].push(arr);
  //   }
   
  // }

   showandhidelike(i:number){
      this.showLike[i] = !this.showLike[i];
      if(this.showallcomment[i]){
      this.showallcomment[i] = false;
      this.showinput[i] = false;
      }
   }
   showandhidecomment(i:number){
    this.showallcomment[i] = !this.showallcomment[i];
    if(this.showLike[i] || this.showinput[i]){
    this.showLike[i] = false;
    this.showinput[i] = false;
    }
 }
   liketweet(i:number){
      let id = this.tweetList[i].id
      this.tweetService.liketweet(id).subscribe(data=>{
          this.tweetList[i] = data;
      })
    
   }

   showinputt(i:number){
    this.showinput[i] = !this.showinput[i];
    if(this.showLike[i] || this.showallcomment[i])
    {
      this.showLike[i] = false;
      this.showallcomment[i] = false;
    }
    
   }

   submitcomment(i:number){
     this.showinput[i] = false;
     let id  = this.tweetList[i].id;
     console.log(this.commentvalue)
     let reply = new Reply(this.commentvalue, 'photo is not available');
     this.tweetService.submitcomment(id, reply).subscribe(data =>{
        this.tweetList[i] = data;
     });
    
   }
   viewuserdetail(username:String){
    this.router.navigateByUrl('/userdashboard/'+username);
  }

}
