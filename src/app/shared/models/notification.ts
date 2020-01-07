export class Notification {
    notificationId:number;
    notificationTitle: string;
    notificationMessage: string;
    notificationReceiverKey:string;
    notificationCreationDate:string;

    constructor(notificationId:number,
        notificationTitle: string,
        notificationMessage: string,
        notificationReceiverKey:string,
        notificationCreationDate:string){
                this.notificationId = notificationId;
                this.notificationTitle = notificationTitle;
                this.notificationMessage = notificationMessage;
                this.notificationReceiverKey = notificationReceiverKey;
                this.notificationCreationDate = notificationCreationDate;
    }
}