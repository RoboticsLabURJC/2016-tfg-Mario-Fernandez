import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable, Observer } from 'rxjs';

import { AlumnoScheme } from '../models/alumnos';
import { ProfesorScheme } from '../models/profesores';

declare var google: any;

@Component({
  selector: 'home',
  templateUrl: './src/homealumno/home.html',
  styleUrls: [ './src/homealumno/home.css' ]
})

export class Home {
  jwt: string;
  decodedJwt: AlumnoScheme;

  profesores: ProfesorScheme[] = [];
  alumno = new AlumnoScheme('', '', '', '', new Date(''),
  {lat: 40.416775, lng: -3.7037901999999576});

  address : string = 'Madrid';
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'F.P.', 'Examenes'];

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    console.log(this.decodedJwt);
  }

  initcoor(address: string) {
    this.getLatLan(address).
      subscribe(
        resolve => this.alumno.Loc = resolve
      );
  }

  getLatLan(address: string) {
    console.log('Getting Address - ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let obj: Object = {lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng() };
          observer.next(obj);
          observer.complete();
        } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
        }
      });
    });
  }

  getallprof() {
    let url = 'http://localhost:3001/profesores';
    this.http.get(url).
      subscribe(
        response => {
          console.log(response.json());
          this.profesores = response.json();
          //console.log(this.profesores);
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
