export class CreateQrRequest{
    productId:string;
    numberOfQrCodeRequired:number;
    pointsForCode:number;
    activationStatus:string;

    constructor(productId:string,
        numberOfQrCodeRequired:number,
        pointsForCode:number,
        activationStatus:string){
            this.productId=productId;
            this.numberOfQrCodeRequired=numberOfQrCodeRequired;
            this.pointsForCode=pointsForCode;
            this.activationStatus=activationStatus;
    }
}