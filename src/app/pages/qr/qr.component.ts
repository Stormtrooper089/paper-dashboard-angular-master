import { Component, OnInit } from '@angular/core';
import { CreateQrRequest } from 'app/shared/models/create-qr-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Product } from 'app/shared/models/product';

@Component({
    selector: 'qr-cmp',
    moduleId: module.id,
    templateUrl: 'qr.component.html'
})

export class QrComponent implements OnInit{

    ngOnInit(){
      this.qrRequest = new CreateQrRequest("",0,0,"true");
      this.loadProducts();
    }

    qrRequest: CreateQrRequest;
    public products: Product[];
    qrRequestUrl: string = environment.qrRequestUrl;
    fileDownloadUrl: string = environment.fileDownloadUrl;
    public productListUrl: string = environment.productListUrl;
    public selectedProduct:string;

    constructor(public httpclient: HttpClient){
            this.qrRequest = new CreateQrRequest("",0,0,"true");
    }

    submitQrRequest(){
        
        this.qrRequest.productId = this.selectedProduct;
        
        let bodyData = JSON.parse(JSON.stringify(this.qrRequest));  
        console.log(bodyData)
        this.httpclient.post(this.qrRequestUrl,bodyData,{responseType: 'text'}).subscribe(
          (data:any) => {
              console.log('filename '+data)
              if(data != null){    
                window.open(this.fileDownloadUrl+data.split(".")[0],"_blank");
              }
          }
        );
    }

    async loadProducts(){
      this.httpclient.get(this.productListUrl).subscribe(
          (data:Product[]) => {
            this.products = data;
          });
  }
}
