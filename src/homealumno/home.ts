import { Component } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {AlumnoService} from '../services/AlumnoService';
import {QueryScheme} from '../models/query';

@Component({
  selector: 'home',
  templateUrl: './src/homealumno/home.html',
  styleUrls: [ './src/homealumno/home.css' ]
})

export class Home {
  jwt: string;
  decodedJwt: Object;
  profesores: Object[] = [];
  alumnocoors: Object = {lat: 40.416775, lng: -3.7037901999999576};

  address : string = 'Madrid';
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'F.P.', 'Examenes'];
  query = new QueryScheme(this.curso[0]);

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp,
  private alumnoService: AlumnoService) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    console.log(this.decodedJwt);
  }

  initcoor(address: string) {
    this.alumnoService.getLatLan(address).
      subscribe(
        resolve => {
          console.log(resolve);
          this.alumnocoors = resolve;
          console.log(this.alumnocoors);
        }
      );
  }

  sendquery(description: QueryScheme) {
    let url = 'http://localhost:3001/profesores';
    let body = JSON.stringify(description);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body);

    this.http.post(url, body, options)
      .subscribe(
        response => {
           console.log(response.json());
           this.profesores = response.json();
           console.log(this.profesores);
         },
         error => {
           alert(error.text());
           console.log(error.text());
         }
      );
  }

  getallprof() {
    let url = 'http://localhost:3001/profesores';
    this.http.get(url).
      subscribe(
       response => {
          console.log(response.json());
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
