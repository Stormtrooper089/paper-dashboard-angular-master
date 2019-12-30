import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Notification} from '../../shared/models/notification'

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    public rows: string[][];
    public notifications: Notification[];
    public notification: Notification;
    public notificationListUrl: string = environment.notificationListUrl;
    public createNotificationUrl: string = environment.createNotificationUrl;

    p: number = 1;
    //sorting
  key: string = 'notificationMessage'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

    constructor(public http: HttpClient){
      this.notification = new Notification(0,'Venkon','','/topics/all','');
        this.displayNotifications();
    }

    ngOnInit(){

    }

    displayNotifications(){
        this.http.get(this.notificationListUrl).subscribe(
            (data:Notification[]) => {
              this.notifications = data;
            });
    }
    sendNotification(data:Notification){
      let bodyData = JSON.parse(JSON.stringify(data));
      this.http.post(this.createNotificationUrl,bodyData,{responseType: 'text'}).subscribe(
        (status:string) => {
          if(status === 'Success'){
              window.alert('Notification sent successfully !!!');
          }
          else{
              window.alert('Something went wrong, Please try again !!!');
          }

        }
      );
    }

    createNotification(){
      let bodyData = JSON.parse(JSON.stringify(this.notification));
      this.http.post(this.createNotificationUrl,bodyData,{responseType: 'text'}).subscribe(
        (status:string) => {
          if(status === 'Success'){
              window.alert('Notification sent successfully !!!');
          }
          else{
              window.alert('Something went wrong, Please try again !!!');
          }

        }
      );
    }
}
