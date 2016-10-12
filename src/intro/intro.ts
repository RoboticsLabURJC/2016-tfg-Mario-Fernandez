import { Component } from '@angular/core';
import { Router} from '@angular/router';



const styles   = require('./intro.css');
const template = require('./intro.html');

@Component({
  selector: 'intro',
  template: template,
  styles: [ styles ]
})
export class Intro {
  constructor(public router: Router) {}
}
