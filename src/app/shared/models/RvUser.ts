export class RvUser{
    mobileNumber:string;
    rewardPoints:string;
    firstName:string;
    qrCode:string;
    latitude:string;
    longitude:string;
    lastName:string;
    address:string;
    state:string;
    city:string;
    role: string;
    referralCode: string;
    rewardPointsEarnedTillDate: string;
    rewardPointsRedeemedTillDate: string;
    active:boolean;
        
      public constructor(mobileNumber:string=null,rewardPoints:string=null,firstName:string=null,
        qrCode: string=null,latitude:string=null,longitude:string=null,lastName:string,
                                                                         address:string,
                                                                         state:string,
                                                                         city:string,role: string,
                                                                         referralCode: string,
                                                                         rewardPointsEarnedTillDate: string,
                                                                         rewardPointsRedeemedTillDate: string
                                                                         ,active:boolean){
               this.mobileNumber = mobileNumber;
               this.rewardPoints = rewardPoints;
               this.firstName = firstName.toUpperCase();
               this.qrCode=qrCode;
               this.latitude=latitude;
               this.longitude=longitude;
               this.lastName=lastName.toUpperCase();
               this.address=address;
               this.state=state;
               this.city=city;
               this.role= role;
               this.referralCode= referralCode;
              this.rewardPointsEarnedTillDate= rewardPointsEarnedTillDate;
              this.rewardPointsRedeemedTillDate= rewardPointsRedeemedTillDate;
              this.active = active;
        }
    }