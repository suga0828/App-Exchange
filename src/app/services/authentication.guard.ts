import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  isLogged: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationService.getStatus()
      .pipe(
        map(status => {
          if (status === null) {
            this.isLogged = false;
          } else {
            this.isLogged = true;
          }

          if (this.isLogged) {
            return true;
          } else {
            this.router.navigate(['console/login']);
            return false;
          }
        }));
  }
}

