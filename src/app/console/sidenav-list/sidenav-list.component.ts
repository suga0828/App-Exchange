import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

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
  @Input('currentUser') currentUser: User;

  @Output() view = new EventEmitter<String>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  changeView(view: String) {
    this.view.emit(view);
  }

  logout() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }
}
