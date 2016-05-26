import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Hero }    from './hero';
import { HeroService } from './hero.service';
@Component({
  selector: 'hero-form',
  templateUrl: 'template/hero-form.component.html',
  styleUrls: ["css/forms.css"]
})
export class HeroFormComponent {
  genres = ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy'];
  model = new Hero('Dr IQ', 18, '5727425f224f33e89a000001', this.genres[0]);
  submitted = false;

  title: string;
  year: number;

  hero: Hero;


  registrado: boolean = false;

  constructor(
    private _heroService: HeroService) {
  }
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done

  registrar(description: Hero){
    this.registrado = true;

    this._heroService.addPharmacy(description).subscribe(
      hero => this.hero = hero
    );
  }
}
