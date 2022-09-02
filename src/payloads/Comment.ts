export class Comment{
    username:string ='';
    comment:string = "";
    imageurl:string = "";
    constructor(username :string, comment:string, imageurl:string){
         this.username = username;
         this.comment = comment;
         this.imageurl = imageurl;
    }
}