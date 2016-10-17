import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { DataAlumno } from './dataalumno';
import { DataProfesor } from './dataprofesor';


@Component({
  selector: 'home',
  templateUrl: './src/home/home.html',
  styleUrls: [ './src/home/home.css' ]
})

export class Home {
  jwt: string;
  decodedJwt: DataAlumno;
  dir: string= '';
  profesores: DataProfesor[] = [];


  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    console.log(this.decodedJwt);
  }

  getallprof() {
    let url = 'http://localhost:3001/profesores';
    this.http.get(url).
      subscribe(
        response => {
          this.profesores = response.json();
          console.log(this.profesores);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }
}
