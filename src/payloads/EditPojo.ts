export class EditPojo{

    tweetId:string = '';
    tweetText:string = '';
    tagText:string = '';

    constructor(tweetId:string, tweetText:string, tagText:string){
        this.tweetId = tweetId;
        this.tweetText = tweetText;
        this.tagText = tagText;
    }
}
