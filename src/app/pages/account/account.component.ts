import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { User } from 'app/shared/models/User';
import { Response } from 'app/shared/models/Response';
import { RvUser } from 'app/shared/models/RvUser';
import { UserKyc } from 'app/shared/models/UserKyc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit{

    key: string = 'mobileNumber'; //set default
    public userListUrl: string = environment.UserListUrl;
    public showKycUrl: string = environment.showKycUrl;
    public userupdateUrl: string = environment.UserUpdateUrl;
    reverse: boolean = false;
    userMaster: RvUser[];
    user: RvUser;
    userKyc: UserKyc;
    responseMessage:string;
    userAction:string = 'Create User';
    btnStatusClass:string = 'btn btn-primary';
    panCard:any;
    aadharCard:any;
    self:any;
    hide:boolean=false;

    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(public http: HttpClient, public domSanitizor:DomSanitizer){
       
        this.displayProducts();
        this.hide = false;
    }

    ngOnInit(){
        this.user = new RvUser('','','','','','','','','','','','','','',true);
    }

    displayProducts(){
        this.http.get(this.userListUrl).subscribe(
            (data:RvUser[]) => {
              this.userMaster = data;
              console.log(this.userMaster);
            });
    }

    submitUser(){
        
        var postUrl:string;
        postUrl = this.userupdateUrl;
        let bodyData = JSON.parse(JSON.stringify(this.user));  
        this.http.post(postUrl,bodyData).subscribe(
          (data:Response) => {
              if(data.responseStatus === 'Success'){
                    this.responseMessage = data.responseStatusDescription;
              }
              
          }
        );
    }

    update(item:RvUser){
        this.userAction = "Update User";
        this.user = item;
    }

    approveKyc(){

    }
    RejectKyc(){

    }
    viewKyc(item:RvUser){
        this.http.get(this.showKycUrl+'/'+item.mobileNumber).subscribe(
            (data:UserKyc) => {
                if(data != null){
              this.userKyc = data;
                this.hide = true;
                this.panCard = null;
                this.aadharCard = null;
                this.self = null;
                this.showImage(data.panCardEncodedImage,'panCard');
                this.showImage(data.adharCardEncodedImage,'aadharCard');
                this.showImage(data.userProfileImage,'userProfile');
                }else
                {
                    this.hide = false;
                    window.alert('Kyc documents not yet uploaded');
                }
              //this.panCard ='data:image/jpeg;base64,'+ data.panCardEncodedImage;

            //   const reader = new FileReader();
            //   reader.onload = (e) => this.panCard = e.target.result;
            //   reader.readAsDataURL(new Blob([data.panCardEncodedImage]));
               console.log(this.userKyc);
            });
    }

    showImage(imageData:any,imageType){
        let TYPED_ARRAY = new Uint8Array(imageData);
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        let base64String = btoa(STRING_CHAR);
        if(imageType === 'panCard'){
            this.panCard = this.domSanitizor.bypassSecurityTrustUrl('data:image/jpg;base64,'+base64String);
        }
        if(imageType === 'aadharCard'){
            this.aadharCard = this.domSanitizor.bypassSecurityTrustUrl('data:image/jpg;base64,'+base64String);
        }
        if(imageType === 'userProfile'){
            this.self = this.domSanitizor.bypassSecurityTrustUrl('data:image/jpg;base64,'+base64String);
        }
        
    }
    changeStatus(item:RvUser){
        if(item.active){
            item.active = false;
        }
        else
        {
            item.active = true;
        }
        let bodyData = JSON.parse(JSON.stringify(item));  
        this.http.post(this.userupdateUrl,bodyData).subscribe(
          (data:Response) => {
              if(data.responseStatus === 'Success'){
                    this.responseMessage = data.responseStatusDescription;
              }
              
          }
        );
    }
}
