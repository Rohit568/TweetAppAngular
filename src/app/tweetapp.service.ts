import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { ChangePassword } from 'src/payloads/ChangePassword';
import { EditPojo } from 'src/payloads/EditPojo';
import { IsAuthorized } from 'src/payloads/IsAuthorized';
import { LoginCredential } from 'src/payloads/LoginCredential';
import { Reply } from 'src/payloads/reply';
import { ResponseMessage } from 'src/payloads/ResponseMessage';
import { Tag } from 'src/payloads/Tag';
import { Tweet } from 'src/payloads/Tweet';
import { TweetResponse } from 'src/payloads/TweetResponse';
import { User } from 'src/payloads/User';
import { UserResponse } from 'src/payloads/UserResponse';
import { UserToken } from 'src/payloads/UserToken';

@Injectable({
  providedIn: 'root'
})
export class TweetappService {
 // serverurl:string = "http://localhost:5000/api/v1.0/tweets";
  serverurl:string ="http://54.212.232.101:5000/api/v1.0/tweets";
  gettagtweets(tag: Tag) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.post<TweetResponse[]>(this.serverurl+"/gettagtweet", tag,{ headers });
    return response;
  }
  updatetweet(newtweet: EditPojo) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.put<String>(this.serverurl+"/" + username + "/update", newtweet, { headers });
    return response;
  }
  searchuser(user:string) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<string[]>(this.serverurl+"/allsimilaruser/"+user, { headers });
    return response;
  }
  searchtweetbytag(tag:Tag){

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.post<TweetResponse[]>(this.serverurl+"/gettagtweet", tag,{ headers });
    return response;
  }
  getalltheusers() {
    
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<string[]>(this.serverurl+"/users/all", { headers });
    return response;
  }
  changepassword(newPass: ChangePassword) {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.put<String>(this.serverurl+"/" + username + "/forgot", newPass, { headers });
    return response;

  }
  deletetweet(id: string) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.delete<String>(this.serverurl+"/" + username + "/delete/" + id, { headers });
    return response;
  }
  edittweet(id: string) {
    throw new Error('Method not implemented.');
  }
  getallmyinfo() {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<UserResponse>(this.serverurl+"/user/search/" + username, { headers });
    return response;

  }
  getalluserinfo(username:string) {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
     const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<UserResponse>(this.serverurl+"/user/search/" + username, { headers });
    return response;

  }
  submitcomment(id: string, reply: Reply) {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.put<TweetResponse>(this.serverurl+"/reply/" + id, reply, { headers });
    return response;
  }
  posttweet(tweet: Tweet) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.post<any>(this.serverurl+"/" + username + "/add", tweet, { headers });
    return response;

  }
  liketweet(id: string) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<TweetResponse>(this.serverurl+"/like/" + id, { headers });
    return response;
  }
  loginUser(credential: LoginCredential): Observable<UserToken> {

    let response = this.httpClient.post<UserToken>(this.serverurl+"/login", credential);

    response.subscribe(data => {
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("Authorization", data.token);
    })
    return response;

  }
  isLogin(): Observable<IsAuthorized> {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let headers = new HttpHeaders().set("Authorization", tokens);
    headers.append('Access-Control-Allow-Origin', '*');
    let response = this.httpClient.get<IsAuthorized>(this.serverurl+"/authorize", { headers });

    return response;
  }

  constructor(
    private httpClient: HttpClient
  ) { };

  registerUser(user: User): Observable<ResponseMessage> {
    let response = this.httpClient.post<ResponseMessage>(this.serverurl+"/register", user);
    //console.log(response);
    return response;

  }

  getalltweets() {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<TweetResponse[]>(this.serverurl+"/all", { headers });
    return response;
  }
}
