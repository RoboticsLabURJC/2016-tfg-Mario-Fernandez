import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ProfesorScheme } from './profesor';

const styles   = require('./signupprofesor.css');
const template = require('./signupprofesor.html');

@Component({
  selector: 'signupprofesor',
  template: template,
  styles: [ styles ]
})

export class SignupProfesor {
  curso = ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'F.P.', 'Examenes'];
  model = new ProfesorScheme('', '', '',
  new Date(''), '', '', {lat: 0, lng: 0});

  constructor(public router: Router, public http: Http) {
  }

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
