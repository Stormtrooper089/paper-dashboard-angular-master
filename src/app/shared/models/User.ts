export class User {
    id:number;
    emailId:string;
    mobileNumber:string;
    password:string;
    delFlg:string;

    constructor(id:number,
        emailId:string,
        mobileNumber:string,
        password:string,
        delFlg:string){
            this.id = id;
            this.emailId = emailId;
            this.mobileNumber = mobileNumber;
            this.password = password;
            this.delFlg = delFlg;

        }
}