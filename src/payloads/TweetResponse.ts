export class TweetResponse{
        tweetId:string = '';
		username :string= '';
		tweetText :string = '';
		tagText :string = '';
		tweetDate :Date = new Date() ;
		likesCount:number =0;
		commentCount :number = 0;
		likes = [];
		comment:Comment[] = [];
         
}