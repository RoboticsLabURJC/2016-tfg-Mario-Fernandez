import { JwtHelperService } from '@auth0/angular-jwt'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter()

    if (!token) {
      return false
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)

    return !tokenExpired
  }

}
