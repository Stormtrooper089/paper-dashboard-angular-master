import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { User } from 'app/shared/models/User';
import { Response } from 'app/shared/models/Response';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    key: string = 'mobileNumber'; //set default
    public userListUrl: string = environment.appUserListUrl;
    public userCreateUrl: string = environment.appUserCreateUrl;
    public userupdateUrl: string = environment.appUserUpdateUrl;
    reverse: boolean = false;
    userMaster: User[];
    user: User;
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
        this.user = new User(0,"","","","Y");
    }

    displayProducts(){
        this.http.get(this.userListUrl).subscribe(
            (data:User[]) => {
              this.userMaster = data;
            });
    }

    submitUser(){
        
        var postUrl:string;
        if(this.userAction === "Create User"){
            postUrl = this.userCreateUrl;
            this.user.delFlg = "N";
        }else
        {
            postUrl = this.userupdateUrl;
        }
        let bodyData = JSON.parse(JSON.stringify(this.user));  
        this.http.post(postUrl,bodyData).subscribe(
          (data:Response) => {
              if(data.responseStatus === 'Success'){
                    this.responseMessage = data.responseStatusDescription;
              }
              
          }
        );
    }

    update(item:User){
        this.userAction = "Update User";
        this.user = item;
    }

    changeStatus(item:User){
        if(item.delFlg === 'N'){
                    item.delFlg = 'Y';
        }else
        {
                item.delFlg = 'N';
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
