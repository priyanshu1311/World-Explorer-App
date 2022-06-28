import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { RouterService } from './router.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  baseurl: string;
  loggedInUser: any;
  errMessage: string;
  flagSearch :true;

  durationInSeconds: number = 4;
  msg: string="";

  ngOnInit(): void {


  }
  constructor(private httpClient: HttpClient, private routerService: RouterService,private _snackBar: MatSnackBar) {
    this.baseurl = "http://localhost:8080/user";
    this.errMessage = '';

  }
 /* openSnackBar(message: string) {
    this._snackBar.open(message);
  }*/
  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      panelClass:'snackbar',

      duration: this.durationInSeconds * 1000,

    });
  }

  setMessage(m:string)
  {
    this.msg=m;


  }
  getmessage() : string
  {
    return this.msg;
  }

  isAuthenticated() {
    if (sessionStorage.getItem("token"))
      return true;
    else return false;
  }
  setProfileEnabled(flag)
  {
     this.flagSearch = flag;
console.log(flag);
//authService.isAuthenticated()
  }
  isProfileEnabled()
  {
    return this.flagSearch;

  }
  isUserAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        if (sessionStorage.getItem('token')) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    );
    return promise;
  }

  getAuth(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    this.httpClient.post(`${this.baseurl}/loginUser`, formData)
      .subscribe(data => {
        console.log(data,'>>>');
        sessionStorage.setItem("token", data['token']);
        sessionStorage.setItem("image", data['image']);


        this.getUserData();

        this.routerService.routeToSearch();
      },
        error => {
          this.errMessage = 'Wrong Username & Password combination'
          this.openSnackBar('Invalid username or password');

        }
      );
  }

  registerUser(user) {
    console.log(user);
    this.httpClient.post(`${this.baseurl}/addNewUser`, user, ({ responseType: "text" }))
      .subscribe(data => {
        this.openSnackBar("successfully registered");

         console.log("successfully registered")

         },error => {


          this.openSnackBar("User already exists with this Email Id !");
          console.log("User already exists with this Email Id !");
           }


      );


  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('image');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('login');

    this.routerService.routeToRecommended();
  }

  getUserData() {
    this.httpClient.get<User>(`${this.baseurl}/findUserByEmail/${this.getToken()}`).subscribe(
      user => {

             sessionStorage.setItem('userName', user.userName);
             sessionStorage.setItem('email', user.emailId);

      console.log(this.loggedInUser,'loggedIn user') },
      error => console.log(error.message)
    );


  }

  getUserDetails(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseurl}/findUserByEmail/${this.getToken()}`);
  }
  updateUser(user) {
    this.httpClient.put<User>('http://localhost:8080/user/updateUser', user)
      .subscribe(data => {
        console.log(data);
        //this.router.routeToTrending();
      }, error => {
        console.log(error.message)
      }
      );
  }

  /*

  deleteUser(): Observable<string> {
    return this.httpClient.delete<string>(`http://localhost:8084/user/deleteUser/${this.getToken()}`);
    // this.logoutUser();
  }
  */
}
