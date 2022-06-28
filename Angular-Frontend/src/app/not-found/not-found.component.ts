import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Location } from '@angular/common'


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(    private routerService: RouterService,private location: Location,) { }

  ngOnInit() {
  }
  back(){
    this.location.back();
  }
}
