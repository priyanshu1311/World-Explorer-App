import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import {ServService} from '../services/serv.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title = 'autocomplete';
  public data:any = [];
  cname: string = '';
  baseUrl : String ="https://restcountries.com/v3.1/name/";


  constructor(private service : ServService,private http: HttpClient,    private routerService: RouterService,){


    this.getData(this.cname);
  }
  ngOnInit() {
    this.cname= this.service.getCountryName();


 this.getData(this.cname);

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

}
