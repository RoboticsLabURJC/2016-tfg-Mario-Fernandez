import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MouseEvent} from 'angular2-google-maps/core';

import { ProfesorScheme } from '../models/profesores';
import {ASIGNATURAS} from '../models/asignaturas';

import {FileSelectDirective,
        FileDropDirective,
        FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3001/api/';

@Component({
  selector: 'signupprofesor',
  templateUrl: './src/signupprofesor/signupprofesor.html',
  styleUrls: [ './src/signupprofesor/signupprofesor.css' ]
})

export class SignupProfesor implements OnInit {
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'FP',
  'EXAMENES LIBRES', 'FRACASO ESCOLAR'];
  asignaturas: Object = ASIGNATURAS;

  profesor = new ProfesorScheme('', '', '', '', new Date(''), {lat: 0, lng: 0},
  this.curso[0], this.asignaturas[0][this.curso[0]][0], "./uploads/muestra.jpg");

  public uploader:FileUploader = new FileUploader({url: URL});

  constructor(public router: Router, public http: Http) {
    console.log(this.curso[0]);
    //let property: string = this.curso[0]
    console.log(this.asignaturas[0]['Primaria'][0]);
  }

  ngOnInit() {
    if (navigator.geolocation) {
      var that = this;
      navigator.geolocation.getCurrentPosition(function(position){
        that.InitCoor(position);
      });
    };
  };

  InitCoor(position: any) {
    this.profesor.Loc.lat = position.coords.latitude;
    this.profesor.Loc.lng = position.coords.longitude;
  };

  mapClicked($event: MouseEvent) {
      this.profesor.Loc.lat = $event.coords.lat;
      this.profesor.Loc.lng = $event.coords.lng;
  };

  registrar(description: ProfesorScheme) {
    let url = 'http://localhost:3001/registerprofesor';
    let body = JSON.stringify(description);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(body);
    this.http.post(url, body, options)
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/profile']);
          console.log(response.json());
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['/profesor']);
  }

}
