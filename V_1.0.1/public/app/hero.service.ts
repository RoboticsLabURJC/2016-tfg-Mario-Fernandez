import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from 'angular2/core';
import {Response, Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class HeroService {

  books: string[] = [];

  constructor(private http: Http) {}

  addPharmacy(item: Hero){

    let url = "http://localhost:3000/api/tvshows";
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
      heroes => heroes.filter(hero => hero.year === id)[0]
    );
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
