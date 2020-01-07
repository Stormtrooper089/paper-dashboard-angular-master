import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  //isSideBarVisible$: Observable<Boolean>;
  isSideBarVisible : boolean = false;
  userName: Observable<string>;

  ngOnInit() { 
    // window.addEventListener("beforeunload", function (e) {
    //   // var confirmationMessage = "\o/";
    //   // console.log("cond");
    //   // e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    //   // return confirmationMessage;              // Gecko, WebKit, Chrome <34
    // });
    
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    //alert('By refreshing this page you may lost all data.');
    this.router.navigateByUrl("");
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('before login');
        if (event['url'] === '/login') {
          console.log('in login');
          this.isSideBarVisible = false;
        } else {
          console.log('in dashboard');
          this.isSideBarVisible = true;
        }
      }
    });
  }
  constructor(private app:AppService,private http:HttpClient,private router:Router){  
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('before login');
        if (event['url'] === '/login') {
          console.log('in login');
          this.isSideBarVisible = false;
        } else {
          console.log('in dashboard');
          this.isSideBarVisible = true;
        }
      }
    });
    
  }

}
