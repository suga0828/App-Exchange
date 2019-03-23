import { Component, OnInit, Input } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  logout() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }

}
