import { first } from "rxjs";
import { TweetR } from "./TweetR";
import { TweetResponse } from "./TweetResponse";

export class UserResponse{
    username :string = '';
    firstName:string = '';
    lastName:string = '';
    email:string = '';
    contact:string ='';
    tweetResponse:TweetR[]=[];
    constructor(username:string, firstName:string, lastName:string, email:string, contact:string, tweetResponse:TweetR[]){

        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email ;
        this.contact = contact;
        this.tweetResponse = tweetResponse;
    }
}