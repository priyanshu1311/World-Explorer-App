import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { RouterService } from '../services/router.service';
import {ServService} from '../services/serv.service';

import { BookMark } from '../model/BookMark'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'autocomplete';
  public data:any = [];
  username: string = '';



  book :BookMark =new BookMark();


  baseUrl : String ="https://restcountries.com/v3.1/name/";

  private bookURL = "http://localhost:8082/favourites/addToFavourites";
  options = [];
  country =[] ;

  filteredOptions;


  formGroup : FormGroup;

  favourites: any;
  constructor(private service : ServService, private fb : FormBuilder,private http: HttpClient,    private routerService: RouterService,){}

  ngOnInit(){
    this.initForm();
    this.getNames();
    this.getCountry();
  }

  initForm(){

    this.formGroup = this.fb.group({
      'country' : ['']
    })
    this.formGroup.get('country').valueChanges.

    pipe(debounceTime(100))
    .subscribe(response => {
       if(response && response.length)
       {
        this.filterData(response);

       }
       else{
        this.filteredOptions=[];

       }
      console.log('data is ', response);


    })

  }

  filterData(enteredData){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  getNames(){
    this.service.getData().subscribe(response => {
      this.options = response;

    })
  }
  onEnter() {
    this.borderChangeFocusOut();

 this.getData(this.formGroup.get('country').value );


  }

  borderChangeFocusIn()
  {

  document.getElementById("searchBar").setAttribute('style',' border-radius:25px  !important;    border-bottom-left-radius:  0px !important; border-bottom-right-radius:  0px !important;')

  }
  borderChangeFocusOut()
  {

  document.getElementById("searchBar").setAttribute('style','color:green; border-radius:25px  !important;  ')

  }


  getData(nm){

    this.http.get(this.baseUrl+nm)
    .subscribe((res)=>{
      this.data = res

      console.log(this.data)

    }
    , (error: HttpErrorResponse) => {

      this.data=[];
     this.routerService.routeToNotFound();



    });
  }


  bookMark(cn : string,fg :string){

this.service.addToFavourites(cn,fg);
this.getCountry();
console.log(this.country);

}
getCountry()
{
  this.service.fetchBookmarkByEmailId(sessionStorage.getItem('email')) .pipe(
    map((response:[]) => response.map(item => item))
  ).subscribe(response => {
      this.country = response;

    })


}

deleteBookMark(nm:any)
{

  this.service.deleteFromBookmarks(nm);

}

countryDet(cn:string){
this.routerService.routeToDetail(cn);
}
}





