import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';

import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import {HeroFormComponent} from './hero-form.component'


@Component({
  selector: 'my-app',
  templateUrl: 'template/app.component.html',
  styleUrls: ["css/stylish-portfolio.css"],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HeroService, HTTP_PROVIDERS, HeroFormComponent]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '/api/tvshows/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/registrar',
    name: 'HeroForm',
    component: HeroFormComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
export class AppComponent {
  title = 'Tour of Heroes';
  public show: boolean=true;

  hidden(){
    this.show = false;
  }
  nothidden(){
    this.show = true;
  }

}
