import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {ProfesorScheme} from '../models/profesores';
import { Http } from '@angular/http';


const URL = 'http://localhost:3001/uploads/';

@Component({
  selector: 'detail',
  templateUrl: './src/detail/detail.html',
  styleUrls: [ './src/detail/detail.css' ]
})

export class ProfesorDetail {

  profesor: ProfesorScheme;
  imgsrc: string;

  constructor(public route: ActivatedRoute, public authHttp: AuthHttp,
     private http: Http) {
  }


  getdata(id: string) {
    console.log(id);
    let url = 'http://localhost:3001/detail/' + id;
    this.http.get(url)
      .subscribe(
        response => {
          console.log(response.json());
          this.profesor = response.json();
          this.imgsrc = 'http://localhost:3001/' +  this.profesor.path;
          console.log(this.profesor);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.getdata(id);
    });
  }
}
