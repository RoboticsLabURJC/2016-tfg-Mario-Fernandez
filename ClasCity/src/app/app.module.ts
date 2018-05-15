import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './common/auth.guard';
import { JwtModule } from '@auth0/angular-jwt'
import { AgmCoreModule} from '@agm/core';
import {AlumnoService} from './services/AlumnoService';
import {FileUploadModule } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import {Intro} from './intro';
import {LoginAlumno} from './loginalumno'
import { LoginProfesor } from './loginprofesor';
import { HomeAlumno } from './homealumno';
import { HomeProfesor } from './homeprofesor';
import { SignupAlumno } from './signupalumno';
import { SignupProfesor } from './signupprofesor';
import { ProfesorDetail } from './detail';


const ROUTES = [
  { path: '',       component:  Intro },
  { path: 'alumno',  component: LoginAlumno },
  { path: 'profesor',  component: LoginProfesor },
  { path: 'signupalumno', component: SignupAlumno },
  { path: 'signupprofesor', component: SignupProfesor },
  { path: 'home',   component: HomeAlumno, canActivate: [AuthGuard] },
  { path: 'profile',   component: HomeProfesor, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ProfesorDetail, canActivate: [AuthGuard] },
  { path: '**',     redirectTo: ''}
];


@NgModule({
  declarations: [
    AppComponent,
    Intro,
    LoginAlumno,
    LoginProfesor,
    SignupAlumno,
    SignupProfesor,
    HomeAlumno,
    HomeProfesor,
    ProfesorDetail
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYUVL5zFNpT0vaziTcpEUUbsmqZ7YRERM'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['you API url']
      }
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AlumnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
