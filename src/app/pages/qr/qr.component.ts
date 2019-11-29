import { Component, OnInit } from '@angular/core';
import { CreateQrRequest } from 'app/shared/models/create-qr-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'qr-cmp',
    moduleId: module.id,
    templateUrl: 'qr.component.html'
})

export class QrComponent implements OnInit{
    ngOnInit(){
    }
    qrRequest: CreateQrRequest;
    qrRequestUrl: string = environment.qrRequestUrl;
    fileDownloadUrl: string = environment.fileDownloadUrl;
    constructor(public httpclient: HttpClient){
            this.qrRequest = new CreateQrRequest("",0,0,0);
    }

    submitQrRequest(){
        let bodyData = JSON.parse(JSON.stringify(this.qrRequest));  
        this.httpclient.post(this.qrRequestUrl,bodyData,{responseType: 'text'}).subscribe(
          (data:any) => {
              console.log('filename '+data)
              if(data != null){    
                window.open(this.fileDownloadUrl+data,"_blank");
              }
          }
        );
    }
}
