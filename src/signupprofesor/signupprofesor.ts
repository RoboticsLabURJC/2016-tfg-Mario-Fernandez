import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MouseEvent} from 'angular2-google-maps/core';

import { ProfesorScheme } from '../models/profesores';

@Component({
  selector: 'signupprofesor',
  templateUrl: './src/signupprofesor/signupprofesor.html',
  styleUrls: [ './src/signupprofesor/signupprofesor.css' ]
})

export class SignupProfesor implements OnInit {
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'F.P.', 'Examenes'];
  model = new ProfesorScheme('', '', new Date(''), {lat: 0, lng: 0}, '', {curso: '' });



  constructor(public router: Router, public http: Http) {
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
    this.model.Loc.lat = position.coords.latitude;
    this.model.Loc.lng = position.coords.longitude;
  };

  mapClicked($event: MouseEvent) {
      this.model.Loc.lat = $event.coords.lat;
      this.model.Loc.lng = $event.coords.lng;
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
          this.router.navigate(['/home']);
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
