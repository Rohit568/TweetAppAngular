export class Comment{
    username:string ="";
    comment:string = "";
    imageurl:string = "";
    commentDate:Date = new Date();
    constructor(username :string, comment:string, imageurl:string, commentDate:Date){
         this.username = username;
         this.comment = comment;
         this.imageurl = imageurl;
         this.commentDate = this.commentDate
    }
}