import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AuthGuard } from './common/auth.guard';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './appcomponent';
import { Home } from './home';
import { Intro} from './intro/intro';
import { LoginAlumno } from './loginalumno';
import { LoginProfesor } from './loginprofesor';
import { SignupAlumno } from './signupalumno';
import { SignupProfesor } from './signupprofesor';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '',       component:  Intro },
      { path: 'alumno',  component: LoginAlumno },
      { path: 'profesor',  component: LoginProfesor },
      { path: 'signupalumno', component: SignupAlumno },
      { path: 'signupprofesor', component: SignupProfesor },
      { path: 'home',   component: Home, canActivate: [AuthGuard] },
      { path: '**',     redirectTo: ''}
    ])
  ],
  declarations: [
    AppComponent,
    Intro,
    LoginAlumno,
    LoginProfesor,
    SignupAlumno,
    SignupProfesor,
    Home
  ],
  bootstrap: [ AppComponent ],
  providers: [
    AuthGuard, ...AUTH_PROVIDERS
  ]
})

export class App {

}
