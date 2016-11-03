import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {ProfesorScheme} from '../models/profesores';

import {FileSelectDirective,
        FileDropDirective,
        FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3001/uploads/';

@Component({
  selector: 'home',
  templateUrl: './src/homeprofesor/home.html',
  styleUrls: [ './src/homeprofesor/home.css' ]
})

export class HomeProfesor {
  jwt: string;
  decodedJwt: Data;
  imgsrc: string;

  public uploader:FileUploader = new FileUploader({url: URL});

  constructor(public router: Router, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    console.log(this.decodedJwt);
    this.imgsrc= "http://localhost:3001/" +  this.decodedJwt.id.path
  }

  sendimg(){
    for (let item of this.uploader.queue){
      item.file.name = this.decodedJwt.Email;
      item.upload();
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }
}

interface Data {
  Email: string;
  id:{
    _id: string,
    apellidos: string,
    asignaturas:string,
    curso: string,
    edad: string,
    location:{ lat: number, lng: number}
    nombre: string,
    path:string
  }
}
