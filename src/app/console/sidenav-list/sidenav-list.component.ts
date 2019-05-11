import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Input('sidenav') sidenav: MatSidenav;

  currentUser: User;
  userSubscription: Subscription;
  isAdmin = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe( (user: User) => {
        this.currentUser = user;
        this.userSubscription = this.userService.getUserById(this.currentUser.uid)
          .subscribe((user: User) => {
            this.currentUser = user;
            if (this.currentUser.isAdmin) {
              this.isAdmin = true;
              console.log(this.isAdmin);
            }
          }, error => console.log(error)
          );
      });
  }

  logout() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }

  ngOnDestroy() {
   this.userSubscription.unsubscribe();
 }
}
