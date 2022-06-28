import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import { RouterService } from '../services/router.service';
import { AuthService } from '../services/auth.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


flag = false;

  constructor(

    private routerService: RouterService,
    public authService: AuthService) { }

  ngOnInit() {

  }

  getProfilePic() {

    return sessionStorage.getItem('image');

  }

  getUserDetails(){
    return sessionStorage.getItem('userName');

  }




}
