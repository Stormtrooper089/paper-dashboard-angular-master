import { Component, OnInit } from '@angular/core';
import { QrMaster } from 'app/shared/models/qr-master';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Response } from 'app/shared/models/Response';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'display-qr.component.html'
})

export class DisplayQrComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    public rows: string[][];
    public qrMaster: QrMaster[];
    public qrListUrl: string = environment.qrListUrl;
    qrUpdateUrl:string = environment.qrUpdateUrl;

    p: number = 1;
    //sorting
  key: string = 'productId'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

    constructor(public http: HttpClient){
        this.displayQrs();
    }

    ngOnInit(){
       
    }

    displayQrs(){
        this.http.get(this.qrListUrl).subscribe(
            (data:QrMaster[]) => {
              this.qrMaster = data;
            });
    }

    activateQr(item: QrMaster){
      let bodyData = JSON.parse(JSON.stringify(item));  
        this.http.post(this.qrUpdateUrl,bodyData).subscribe(
          (data:Response) => {
              if(data.responseStatus === 'Success'){
                    let responseMessage = data.responseStatusDescription;
                    window.alert(responseMessage);
              }else{
                  window.alert(data.responseStatusDescription);
              }
          }
        );
    }
}
