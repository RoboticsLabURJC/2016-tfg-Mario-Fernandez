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
  private books: string[] = [];

  constructor(
    private _heroService: HeroService) {
  }
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  registrar(){
    this.books = [];
    this._heroService.putPharmacy(this.diagnostic).subscribe(
      books => this.books = books,
      error => console.error(error)
    );
  }
}
