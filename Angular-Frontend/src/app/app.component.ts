import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HostListener, ElementRef } from '@angular/core';
import { ViewportScroller
 } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(

    public authService: AuthService,private scroll: ViewportScroller) {
      sessionStorage.setItem('login','false');
    }


  title = 'World-Explorer-App';

  lgio()
  {
    return sessionStorage.getItem('login');
  }
  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

}
