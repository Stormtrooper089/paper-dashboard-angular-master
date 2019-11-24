import { Component, OnInit } from '@angular/core';
import { CreateQrRequest } from 'app/shared/models/create-qr-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'qr-cmp',
    moduleId: module.id,
    templateUrl: 'qr.component.html'
})

export class QrComponent implements OnInit{
    ngOnInit(){
    }
    qrRequest: CreateQrRequest;
    qrRequestUrl: string = "http://localhost:8082/api/generateQRExcel";
    fileDownloadUrl: string = "http://localhost:8082/api/downloadExcel/";
    constructor(public httpclient: HttpClient){
            this.qrRequest = new CreateQrRequest("",0,0,0);
    }

    submitQrRequest(){
        let bodyData = JSON.parse(JSON.stringify(this.qrRequest));  
        this.httpclient.post(this.qrRequestUrl,bodyData,{responseType: 'text'}).subscribe(
          (data:any) => {
              console.log('filename '+data)   
                        
              window.open(this.fileDownloadUrl+data.split('.')[0]);
          }
        );
    }
}
