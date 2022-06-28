import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators'

import { RouterService } from './router.service';
import { BookMark } from '../model/BookMark';

import {  AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServService {
  baseUrl : String ="https://restcountries.com/v3.1/name/";
 private cn : string ;
  bookMark:  BookMark =new BookMark();

  users = new Array<any>();
  public favourite:any ;

  userName: string = "tektutorialshub"
  repos: BookMark[];

  loading: boolean = false;
  errorMessage;

   msg:string ;
  constructor(private http : HttpClient,private routerService: RouterService, private authServ :AuthService) {

  }
//for search component
  getData(){
    return this.http.get('https://restcountries.com/v3.1/all')
      .pipe(
        map((response:[]) => response.map(item => item['name']['common']))
      )
  }

  getCountryName  ()
  {
    alert(this.cn);
    return this.cn;

  }

  setCountryName(cn)
  {
    alert(cn);
    this.cn=cn;
  }

  setMessage(m:string)
  {
    this.msg=m;


  }
  getmessage() : string
  {
    return this.msg;
  }


  addToFavourites(cn : string,fg:String)  {



    this.bookMark.emailId=sessionStorage.getItem('email');
    this.bookMark.image=fg;

    this.bookMark.title=cn;

    this.http.post<BookMark>('http://localhost:8080/bookmarks/addToBookmarks', this.bookMark).subscribe(
      data => {

        this.authServ.openSnackBar("BookMarked");


            },
            (error: HttpErrorResponse) => {

              this.authServ.openSnackBar("Already Bookmarked");
              console.log(error.message)





            });


  }



  fetchBookmarkByEmailId(emailId: string): any {
  return   this.http.get(`http://localhost:8080/bookmarks/getAllBookmarksByEmailId/${emailId}`);
  }

  deleteFromBookmarks(b: any) {
     this.http.delete(`http://localhost:8080/bookmarks/deleteFromBookmarks/${b.bookmarkId}`).subscribe(
      data => {

        this.authServ.openSnackBar("BookMark Removed");


            },
            (error: HttpErrorResponse) => {

              this.authServ.openSnackBar("Something went wrong");
              console.log(error.message)


            });



  }



}
