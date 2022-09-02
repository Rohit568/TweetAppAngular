import { first, last } from "rxjs";

export class User{

    private firstName:string = "";
    private lastName: string = "";
    private username : string = '';
    private email: string = ''; 
    private contact:string = '' ;
    private password :string = '';
    constructor( firstName:string,lastName: string, username : string, email: string, contact:string , password :string)
        {
            this.firstName =  firstName;
            this.lastName = lastName;
            this.username = username ;
            this.email = email;
            this.contact = contact;
            this.password = password;
        }
   
}