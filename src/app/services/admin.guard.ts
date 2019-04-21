import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

import { SidenavListComponent } from '../console/sidenav-list/sidenav-list.component';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  currentUser: User;
  userSubscription: Subscription;
  admin: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true
    // this.authenticationService.getStatus().toPromise()
    // .then( () => {
    //   return of(true)
    // })
    // .catch()
      // .subscribe( (user: User) => {
      //   this.userService.getUserById(user.uid)
      //     .subscribe( (user: User) => {
      //       if (user.isAdmin) {
      //         return of(true);
      //       }
      //       return of(false);
      //     }, error => console.log(error)
      //     );
      // })
      
  }
}
