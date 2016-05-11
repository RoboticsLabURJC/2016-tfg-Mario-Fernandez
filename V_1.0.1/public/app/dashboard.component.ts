import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import {HeroFormComponent} from './hero-form.component'

@Component({
  selector: 'my-dashboard',
  templateUrl: 'template/dashboard.component.html',
  styleUrls: ['css/dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  private books: string[] = [];

  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  ngOnInit() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }

  search() {
        this.books = [];
        this._heroService.getAllPharmacy().subscribe(
          books => this.books = books,
          error => console.error(error)
        );
  }


  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.year }];
    this._router.navigate(link);
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
