import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-welcome',
  templateUrl: 'template/welcome.component.html',
  styleUrls: ['css/welcome.component.css'],

})
export class WelcomeComponent {
  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  gotoRegister() {
    this._router.navigate(['Register']);
  }

  gotoInit() {
    this._router.navigate(['Init']);
  }

}
