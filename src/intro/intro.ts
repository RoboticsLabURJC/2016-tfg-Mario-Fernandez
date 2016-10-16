import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './src/intro/intro.html',
  styleUrls: [ './src/intro/intro.css' ]
})
export class Intro {
  constructor(public router: Router) {}
}
