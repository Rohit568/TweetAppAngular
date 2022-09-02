export class UserToken{
    username :string = "";
    token: string = "";
    login: boolean = false;
    
    constructor(username :string, token: string, login:boolean){
        this.username = username;
        this.token = token;
        this.login = login;
    }
}