import { Component, OnInit } from '@angular/core';
import { QrMaster } from 'app/shared/models/qr-master';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

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
}
