import {Comment} from '../payloads/Comment';
export class TweetResponse{
        id:string = '';
		username :string= '';
		tweetText :string = '';
		tagText :string = '';
		tweetDate :Date = new Date() ;
		likesCount:number =0;
		commentCount :number = 0;
		likes = [];
		comments:Comment[] = [];
        constructor(tweetId:string,
            username :string,
		tweetText :string ,
		tagText :string,
		tweetDate :Date ,
		likesCount:number ,
		commentCount :number ,
		likes = [],
		comments:Comment[]){
            this.username = username;
            this.id = tweetId;
            this.tweetText = tweetText;
            this.tweetDate = tweetDate;
            this.tagText = tagText;
            this.likesCount = likesCount;
            this.commentCount = commentCount;
            this.likes = likes;
            this.comments = comments;


        }

         
}