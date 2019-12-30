export class UserKyc {
    id:number;
    mobileNumber:string;
    panCardStatus:string;
    panCardEncodedImage: any;
    adharCardStatus:string;
    adharCardEncodedImage:any;
    userProfileStatus:string;
    userProfileImage:any;

    constructor(id:number,
        mobileNumber:string,
        panCardStatus:string,
        panCardEncodedImage: any,
        adharCardStatus:string,
        adharCardEncodedImage:any,
        userProfileStatus:string,
        userProfileImage:any){
            this.id = id;
            this.panCardStatus = panCardStatus;
            this.panCardEncodedImage = panCardEncodedImage;
            this.adharCardStatus = adharCardStatus;
            this.adharCardEncodedImage = adharCardEncodedImage;
            this.userProfileStatus = userProfileStatus;
            this.userProfileImage = userProfileImage;
    }
}