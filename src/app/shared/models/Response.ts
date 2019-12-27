export class Response {
    responseStatus:string;
    responseStatusDescription:string;
    transactionID:string;

    constructor(responseStatus:string,
        responseStatusDescription:string,
        transactionID:string){
            this.responseStatus = responseStatus;
            this.responseStatusDescription = responseStatusDescription;
            this.transactionID = transactionID;
        }
}