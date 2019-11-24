export class CreateQrRequest{
    productId:string;
    numberOfQrCodeRequired:number;
    pointsForCode:number;
    activationStatus:number;

    constructor(productId:string,
        numberOfQrCodeRequired:number,
        pointsForCode:number,
        activationStatus:number){
            this.productId=productId;
            this.numberOfQrCodeRequired=numberOfQrCodeRequired;
            this.pointsForCode=pointsForCode;
            this.activationStatus=activationStatus;
    }
}