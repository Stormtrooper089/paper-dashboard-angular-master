import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable()
export class AppService {

    //private loggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn : boolean = false;
    private userName = new BehaviorSubject<string>('');
    private authenticationUrl = environment.authenticationUrl;
    // get isLoggedIn() {
    //     return this.loggedIn.asObservable(); // {2}
    // }
    get getUserName(){
        return this.userName.asObservable();
    }
 // authenticated = false;

  constructor(private http: HttpClient,private router:Router) {
  }

  authenticate(credentials, callback) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});
        this.http.get(this.authenticationUrl, {headers: headers}).subscribe((response: any) => {
        //this.http.get('http://localhost:8080/login', {headers: headers}).subscribe(response => {
            if(response.authenticated){
                //this.loggedIn.next(true);
                this.isLoggedIn = true;
                this.userName.next(response.name);
                console.log('Authenticated');
            }else{
                this.isLoggedIn = false;
                this.userName.next('');
                console.log('Un-Authorized');
            }
            // if (response['Username']) {
            //     this.loggedIn.next(true);
            //     console.log('Authenticated');
            // } else {
            //     console.log('Not Authenticated' + response);
            //     this.loggedIn.next(false);
            // }
            //this.loggedIn.next(true);
            return callback && callback();
        });

    }

    
  logout() {          
    console.log('Logging out');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    }

}