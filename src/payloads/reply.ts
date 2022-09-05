export class Reply{

    reply:string = "";
    imageUrl:string = "";
    constructor(comment:string, imageurl:string){
      
         this.reply = comment;
         this.imageUrl = imageurl;
    }
}