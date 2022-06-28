import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {


  public data:any = [];

  constructor(private http: HttpClient,) {
    this.getData();
    this.data = this.shuffle(this.data);
  }

  ngOnInit(): void {
  }

  getData(){
    const url ='https://restcountries.com/v3.1/all'
    this.http.get(url).subscribe((res)=>{
      this.data = res
      this.data = this.shuffle(this.data);
      console.log(this.data);

    })
  }
  shuffle(list) {
    return list.reduce((p, n) => {
      const size = p.length;
      const index = Math.trunc(Math.random() * (size - 1));
      p.splice(index, 0, n);
      return p;
    }, []);
  };

}
