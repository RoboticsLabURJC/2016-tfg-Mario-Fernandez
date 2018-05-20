import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlumnoScheme } from '../models/alumnos';

const URL_SERVER ='http://ec2-54-84-25-113.compute-1.amazonaws.com/app';

@Component({
  selector: 'signupalumno',
  templateUrl: './signupalumno.html',
  styleUrls: [ './signupalumno.css' ]
})

export class SignupAlumno {

  alumno = new AlumnoScheme('', '', '', '', new Date(''), {lat: 0, lng: 0});

  constructor(public router: Router, public http: Http) {
  }

  registrar(description: AlumnoScheme) {
    let url = URL_SERVER+'/registeralumno';
    let body = JSON.stringify(description);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options)
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigateByUrl('/home');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['/alumno']);
  }

}
