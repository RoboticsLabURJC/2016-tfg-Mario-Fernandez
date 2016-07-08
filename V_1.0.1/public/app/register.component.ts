import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Pharma }    from './pharma';
import { HeroService } from './hero.service';
@Component({
  selector: 'register',
  templateUrl: 'template/register.component.html',
  styleUrls: ["css/register.css"]
})
export class RegisterComponent {
  types = ['24 Hours', 'Herbalist', 'Botany', 'Clinical Pharmacy'];
  model = new Pharma('Dr IQ', "18", this.types[0]);
  submitted = false;
  onepharma: Pharma;

  registrado: boolean = false;

  constructor(
    private _heroService: HeroService) {
  }
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done

  registrar(description: Pharma){
    this.registrado = true;

    this._heroService.addPharmacy(description).subscribe(
      onepharma => this.onepharma = onepharma
    );
  }
}
