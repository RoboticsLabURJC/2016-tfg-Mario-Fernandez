import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }  else {
      localStorage.removeItem('id_token');
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
