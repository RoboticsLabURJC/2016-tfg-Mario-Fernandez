import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Login }    from './login';
import {HeroService } from './hero.service';
@Component({
  selector: 'init',
  templateUrl: 'template/init.component.html',
  styleUrls: ["css/init.css"]
})
export class InitComponent {
  types = ['24 Hours', 'Herbalist', 'Botany', 'Clinical Pharmacy'];
  model = new Login('Dr IQ', 18, '5727425f224f33e89a000001');
  submitted = false;
  onelogin: Login;
  registrado: boolean = false;

  constructor(
    private _heroService: HeroService) {
  }
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done

  iniciar(description: Login){
    this.registrado = true;

    this._heroService.initSesion(description).subscribe(
      onelogin => this.onelogin = onelogin
    );
  }
}
