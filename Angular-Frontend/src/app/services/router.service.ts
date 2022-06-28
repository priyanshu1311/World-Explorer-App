import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  routeToRecommended() {
    this.router.navigate([""]);
  }
  constructor(private router: Router) { }

  routeToSearch() {
    this.router.navigate(["search"]);
  }



  routeToLogin() {
    this.router.navigate(["login"]);
  }

  routeToFacebook(){
  }
  routeToNotFound(){
    this.router.navigate(["notfound"]);
  }
  routeToDetail(cn:string){
    this.router.navigate(["country-det/"+cn]);
  }
}
