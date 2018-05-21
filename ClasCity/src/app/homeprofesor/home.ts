import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {ProfesorScheme} from '../models/profesores';
import { Http,  Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';

import {FileSelectDirective,
        FileDropDirective,
        FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL_SERVER ='https://54.84.25.113/app';
const URL_CHAT ='http://localhost:8000';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.css' ]
})

export class HomeProfesor {
  jwt: string;
  decodedJwt: Data;
  imgsrc: string;
  message = '';
  socket = null;
  conversation = [];


  public uploader: FileUploader = new FileUploader({url: URL_SERVER+'uploads'});

  constructor(public router: Router, public http: Http, public jwtHelper: JwtHelperService) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
    this.imgsrc = URL_SERVER +'/'+ this.decodedJwt.id.path;
  }

  ngOnInit(): void {
    this.getnotification(this.decodedJwt);
    this.socket = io(URL_CHAT);
    this.socket.emit('room', {'roomName': this.decodedJwt.id._id, 'userName': this.decodedJwt.id.nombre});
    this.socket.on('intro', function(data) {
            this.conversation.push(data);
    }.bind(this));

    this.socket.on('message', function(data) {
           this.conversation.push(data);
    }.bind(this));

    this.socket.on('client left', function(data) {
           this.conversation.push(data);
    }.bind(this));
  }

getready(profe: string, alumno: string) {
  let url = URL_SERVER+'/readynotification';
  let body = JSON.stringify({'profe': profe, "alumno": alumno});
  let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  this.http.post(url, body, options)
    .subscribe(
      response => {
         console.log(response);
       },
       error => {
         alert(error.text());
         console.log(error.text());
       }
    );
  }




  getnotification(data: any){
    console.log(data);

    if (data.id.notification.length == 0){
      alert("No tienes inguna notificación");
    }else{
      for(let item of data.id.notification){
        if (!item["leido"]){
          this.getready(data.id._id, item["alumno"]._id);
          //manejo el objeto alumno y envio una peticion get con numero de iteración


        }
        console.log();
        alert("Tienes una notificación de: " + item.nombre);
      }
    }
  }

  sendimg() {
    for (let item of this.uploader.queue){
      item.file.name = this.decodedJwt.Email;
      item.upload();
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }
  send() {
      this.socket.emit('newMessage', {
          'userName': this.decodedJwt.id.nombre,
          'text': this.message
      });
      this.message = '';
}

keypressHandler(event) {
     if (event.keyCode === 13) {
         this.send();
     }
 }

}

interface Data {
  Email: string;
  id: {
    _id: string,
    apellidos: string,
    asignaturas: string,
    curso: string,
    edad: string,
    location: { lat: number, lng: number}
    nombre: string,
    path: string
  };
}
