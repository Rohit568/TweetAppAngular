
export class Tweet{
    tweettext:string = '';
    tagtext :string = '';
    constructor(tweettext:string, tagtext:string){
        this.tweettext = tweettext;
        this.tagtext = tagtext;
    }
}