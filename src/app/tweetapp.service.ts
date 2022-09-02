import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { IsAuthorized } from 'src/payloads/IsAuthorized';
import { LoginCredential } from 'src/payloads/LoginCredential';
import { ResponseMessage } from 'src/payloads/ResponseMessage';
import { TweetResponse } from 'src/payloads/TweetResponse';
import { User } from 'src/payloads/User';
import { UserToken } from 'src/payloads/UserToken';

@Injectable({
  providedIn: 'root'
})
export class TweetappService {
  loginUser(credential: LoginCredential) :Observable<UserToken>{
    
    let response = this.httpClient.post<UserToken>("http://localhost:8180/api/v1.0/tweets/login", credential);

    response.subscribe(data => {
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("Authorization",  data.token);
    })
    return response;

  }
  isLogin(): Observable<IsAuthorized>{
    let tokens:string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers= new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<IsAuthorized>("http://localhost:8180/api/v1.0/tweets/authorize",  { headers });
    
    return response;
  }

 constructor(
    private httpClient:HttpClient
  ){};

 registerUser(user : User): Observable<ResponseMessage> {
   let response = this.httpClient.post<ResponseMessage>("http://localhost:8180/api/v1.0/tweets/register", user);
   //console.log(response);
   return response;

 }

 getalltweets():Observable<TweetResponse>{

  let tokens:string = 'Bearer ' + sessionStorage.getItem('Authorization');
  const headers= new HttpHeaders().set("Authorization", tokens);
  let response = this.httpClient.get<TweetResponse>("http://localhost:8180/api/v1.0/tweets/all",{headers});
  return response;
 }
}
