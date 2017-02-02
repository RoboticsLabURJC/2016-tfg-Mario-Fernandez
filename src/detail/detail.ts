import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {ProfesorScheme} from '../models/profesores';
import { Http } from '@angular/http';

const URL = 'http://localhost:3001/uploads/';

@Component({
  selector: 'detail',
  templateUrl: './src/detail/detail.html',
  styleUrls: [ './src/detail/detail.css' ]
})

export class ProfesorDetail {

  profesor: ProfesorScheme;
  imgsrc: string;
  socket = null;
  message = '';
  conversation = [];
  jwt: string;
  decodedJwt: Data;
  id: string;

  constructor(public route: ActivatedRoute, public authHttp: AuthHttp,
     private http: Http) {

  }

  getdata(id: string) {
  console.log(id);
  let url = 'http://localhost:3001/detail/' + id;
  this.http.get(url)
    .subscribe(
      response => {
        console.log(response.json());
        this.profesor = response.json();
        this.imgsrc = 'http://localhost:3001/' +  response.json().path;
        console.log(this.profesor);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.getdata(this.id);
    });
    this.socket = io('http://localhost:8000');
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
    this.socket.emit('room', {'roomName': this.id, 'userName': this.decodedJwt.id.nombre});

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

  send() {
        this.socket.emit('newMessage', {
            'roomName': this.id,
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
