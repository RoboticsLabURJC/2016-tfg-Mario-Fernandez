import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from 'angular2/core';
import {Response, Http, Headers, RequestOptions} from 'angular2/http';

import 'rxjs/Rx';


@Injectable()
export class HeroService {

  books: string[] = [];

  constructor(private http: Http) {}

  getHeroes() {
    return Promise.resolve(HEROES);
  }

  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  putPharmacy(data){
    let url = "http://localhost:3000/api/tvshows";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, data, options).map(
      response => this.extractTitles(response)
    )

  }

  getAllPharmacy() {
    let url = "http://localhost:3000/api/tvshows/";

    return this.http.get(url).map(
      response => this.extractTitles(response)
    )
  }

  private extractTitles(response: Response) {
    return response.json().map( book => book.title)
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
