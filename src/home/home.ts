import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { DataAlumno } from './dataalumno';

@Component({
  selector: 'home',
  templateUrl: './src/home/home.html',
  styleUrls: [ './src/home/home.css' ]
})

export class Home {
  jwt: string;
  decodedJwt: DataAlumno;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    console.log(this.decodedJwt);
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }


}
