import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { RVRedemption } from 'app/shared/models/RVRedemption';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'product-master.component.html'
})

export class ProductMaster implements OnInit{
    
    public rows: string[][];
    public qrMaster: RVRedemption[];
    public qrListUrl: string = environment.redemptionListtUrl;
    public uploadUrl: string = environment.productMasterUploadUrl;
    fileData: File = null;
    previewUrl:any = null;
    selectedFile: string = null;
    uploadedFilePath: string = null;

    p: number = 1;
    //sorting
  key: string = 'redeemUser'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

    constructor(public http: HttpClient){
        //this.displayProducts();
    }

    ngOnInit(){
       
    }
    // File Upload
    fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.selectedFile = this.fileData.name;
    //  this.preview();
    }

    // preview() {
    //   // Show preview 
    //   var mimeType = this.fileData.type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     return;
    //   }
   
    //   var reader = new FileReader();      
    //   reader.readAsDataURL(this.fileData); 
    //   reader.onload = (_event) => { 
    //     this.previewUrl = reader.result; 
    //   }
    // }

    onSubmit() {
      const formData = new FormData();
        formData.append('file', this.fileData);
        console.log(this.fileData);
        this.http.post(this.uploadUrl, formData,{responseType: 'text'})
          .subscribe(res => {
            console.log(res);
            //this.uploadedFilePath = res;
            window.alert("Products added successfully . . .")
          })
    }

    //End File Upload
    displayProducts(){
        this.http.get(this.qrListUrl).subscribe(
            (data:RVRedemption[]) => {
              this.qrMaster = data;
            });
    }
    // uploadMaster(){
    //   //data.redeemStatus="accept";
    //   //let bodyData = JSON.parse(JSON.stringify(data));  
    //   this.http.post(this.approvalUrl,bodyData).subscribe(
    //     (redemptionList:RVRedemption[]) => {
    //       this.qrMaster = redemptionList;
           
    //     }
    //   );
    // }
    
}
