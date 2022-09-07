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
  gettagtweets(tag: Tag) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.post<TweetResponse[]>("http://localhost:8180/api/v1.0/tweets/gettagtweet", tag,{ headers });
    return response;
  }
  updatetweet(newtweet: EditPojo) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.put<String>("http://localhost:8180/api/v1.0/tweets/" + username + "/update", newtweet, { headers });
    return response;
  }
  searchuser(user:string) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<string[]>("http://localhost:8180/api/v1.0/tweets/allsimilaruser/"+user, { headers });
    return response;
  }
  searchtweetbytag(tag:Tag){

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.post<TweetResponse[]>("http://localhost:8180/api/v1.0/tweets/gettagtweet", tag,{ headers });
    return response;
  }
  getalltheusers() {
    
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<string[]>("http://localhost:8180/api/v1.0/tweets/users/all", { headers });
    return response;
  }
  changepassword(newPass: ChangePassword) {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.put<String>("http://localhost:8180/api/v1.0/tweets/" + username + "/forgot", newPass, { headers });
    return response;

  }
  deletetweet(id: string) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.delete<String>("http://localhost:8180/api/v1.0/tweets/" + username + "/delete/" + id, { headers });
    return response;
  }
  edittweet(id: string) {
    throw new Error('Method not implemented.');
  }
  getallmyinfo() {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<UserResponse>("http://localhost:8180/api/v1.0/tweets/user/search/" + username, { headers });
    return response;

  }
  getalluserinfo(username:string) {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
     const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<UserResponse>("http://localhost:8180/api/v1.0/tweets/user/search/" + username, { headers });
    return response;

  }
  submitcomment(id: string, reply: Reply) {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.put<TweetResponse>("http://localhost:8180/api/v1.0/tweets/reply/" + id, reply, { headers });
    return response;
  }
  posttweet(tweet: Tweet) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    let username = sessionStorage.getItem('username');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.post<any>("http://localhost:8180/api/v1.0/tweets/" + username + "/add", tweet, { headers });
    return response;

  }
  liketweet(id: string) {
    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<TweetResponse>("http://localhost:8180/api/v1.0/tweets/like/" + id, { headers });
    return response;
  }
  loginUser(credential: LoginCredential): Observable<UserToken> {

    let response = this.httpClient.post<UserToken>("http://localhost:8180/api/v1.0/tweets/login", credential);

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
    let response = this.httpClient.get<IsAuthorized>("http://localhost:8180/api/v1.0/tweets/authorize", { headers });

    return response;
  }

  constructor(
    private httpClient: HttpClient
  ) { };

  registerUser(user: User): Observable<ResponseMessage> {
    let response = this.httpClient.post<ResponseMessage>("http://localhost:8180/api/v1.0/tweets/register", user);
    //console.log(response);
    return response;

  }

  getalltweets() {

    let tokens: string = 'Bearer ' + sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders().set("Authorization", tokens);
    let response = this.httpClient.get<TweetResponse[]>("http://localhost:8180/api/v1.0/tweets/all", { headers });
    return response;
  }
}
