import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Data } from './data';
//import { AUTH_PROVIDERS } from 'angular2-jwt';
//import {jwt_decode} from 'jwt_decode';


const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})

export class Home {
  jwt: string;
  decodedJwt: Data;

  data: Data;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }


}
