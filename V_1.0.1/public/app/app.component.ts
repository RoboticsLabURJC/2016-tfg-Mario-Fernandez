import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';

import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { RegisterComponent} from './register.component';
import { WelcomeComponent} from './welcome.component';
import { InitComponent} from './init.component';


@Component({
  selector: 'my-app',
  templateUrl: 'template/app.component.html',
  styleUrls: ["css/style-menu.css"],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HeroService, HTTP_PROVIDERS, RegisterComponent]
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
    path: '/register',
    name: 'Register',
    component: RegisterComponent
  },
  {
    path: '/init',
    name: 'Init',
    component: InitComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomeComponent,
    useAsDefault: true
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
