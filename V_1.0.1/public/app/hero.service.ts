import { Login } from './login';
import { Pharma } from './pharma';
import { HEROES } from './mock-heroes';
import { Injectable } from 'angular2/core';
import {Response, Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {localStorage} from 'localStorage';
import 'rxjs/Rx';


@Injectable()
export class HeroService {

  pharmacys: Pharma[] = [];
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        '/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  initSesion  (item: Login){

      let url = "http://localhost:3000/api/login";
      let body = JSON.stringify(item);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(url, body, options)
        .map(response => response.json()).catch(error => this.handleError(error));
    }

  addPharmacy(item: Pharma){

    let url = "http://localhost:3000/api/pharmacys";
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.post(url, body, options)
      .map(response => response.json()).catch(error => this.handleError(error));

  }

  getAllPharmacy() {
    let url = "http://localhost:3000/api/tvshows/";
    return this.http.get(url)
      .map(response => response.json()).catch(error => this.handleError(error));
  }

  private handleError(error: any){
      console.error(error);
      return Observable.throw("Server error (" + error.status + "): " + error.text())
  }



  getHeroes() {
    return Promise.resolve(HEROES);
  }

  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.password === id)[0]
    );
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
