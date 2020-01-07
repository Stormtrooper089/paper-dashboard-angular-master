import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { RVRedemption } from 'app/shared/models/RVRedemption';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'process-redeem.component.html'
})

export class ProcessRedeemComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    public rows: string[][];
    public qrMaster: RVRedemption[];
    public qrListUrl: string = environment.redemptionListtUrl;
    public approvalUrl: string = environment.redemptionPosttUrl;

    p: number = 1;
    //sorting
  key: string = 'redeemUser'; //set default
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
            (data:RVRedemption[]) => {
              this.qrMaster = data;
            });
    }
    accept(data:RVRedemption){
      data.redeemStatus="Approved";
      let bodyData = JSON.parse(JSON.stringify(data));
      this.http.post(this.approvalUrl,bodyData).subscribe(
        (redemptionList:RVRedemption[]) => {
          this.qrMaster = redemptionList;

        }
      );
    }
    reject(data:RVRedemption){
      data.redeemStatus="Rejected";
      let bodyData = JSON.parse(JSON.stringify(data));
        this.http.post(this.approvalUrl,bodyData,{responseType: 'text'}).subscribe(
          (data:any) => {
              console.log('filename '+data)

          }
        );
    }
}
