import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  public data:any = [];
  username: string = '';
  countryName :string;
  baseUrl : String ="https://restcountries.com/v3.1/name/";

  constructor( private activatedRoute: ActivatedRoute,private http: HttpClient,    private routerService: RouterService, ) {

  }

  ngOnInit() {
    this.countryName = this.activatedRoute.snapshot.params['countryName'];

    this.getData(this.countryName);

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
      alert(error.statusText);



    });


  }

  back(){
    this.routerService.routeToSearch();
  }

}
