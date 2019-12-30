import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { User } from 'app/shared/models/User';
import { Response } from 'app/shared/models/Response';
import { RvUser } from 'app/shared/models/RvUser';
import { UserKyc } from 'app/shared/models/UserKyc';

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

    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(public http: HttpClient){
       
        this.displayProducts();
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
    viewKyc(item:RvUser){
        this.http.get(this.showKycUrl+'/'+item.mobileNumber).subscribe(
            (data:UserKyc) => {
              this.userKyc = data;
              console.log(this.userKyc);
            });
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
