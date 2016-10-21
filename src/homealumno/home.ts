import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { DataAlumno } from './dataalumno';
import { DataProfesor } from './dataprofesor';
import { Observable, Observer } from 'rxjs';


declare var google: any;

@Component({
  selector: 'home',
  templateUrl: './src/homealumno/home.html',
  styleUrls: [ './src/homealumno/home.css' ]
})

export class Home {
  jwt: string;
  decodedJwt: DataAlumno;

  profesores: DataProfesor[] = [];
  alumno = new DataAlumno('', '', new Date(''), '', {lat: 40.416775, lng: -3.7037901999999576});

  address : string = 'Madrid';
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'F.P.', 'Examenes'];
  numero: number[] = [];

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    console.log(this.decodedJwt);
  }

  initcoor(address: string){
    this.getLatLan(address).
      subscribe(
        response => {
          console.log(response);
          console.log(this.alumno.loc);
          this.alumno.loc = response;
          console.log(this.alumno.loc);
          //console.log(this.alumno.loc.lat);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  getLatLan(address: string) {
        console.log('Getting Address - ', address);
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  let obj: Object= {lat: results[0].geometry.location.lat(),lng: results[0].geometry.location.lng() }
                  observer.next(obj);
                  observer.complete();
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
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
