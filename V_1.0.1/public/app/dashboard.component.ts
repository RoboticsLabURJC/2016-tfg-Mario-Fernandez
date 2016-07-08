import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Pharma } from './pharma';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: 'template/dashboard.component.html',
  styleUrls: ['css/dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  pharmacys: Pharma[] = [];

  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  ngOnInit() {
    this._heroService.getHeroes()
      .then(pharmacys => this.pharmacys = pharmacys.slice(1,5));
  }

  search() {

        this._heroService.getAllPharmacy().subscribe(
          pharmacys => this.pharmacys = pharmacys,
          error => console.error(error)
        );
  }

  gotoDetail(onepharma: Pharma) {
    let link = ['HeroDetail', { id: onepharma.password }];
    this._router.navigate(link);
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
