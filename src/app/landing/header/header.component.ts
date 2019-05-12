import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActive = false;

  currentUser;

  constructor(
    private scrollService: ScrollService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getStatus()
      .subscribe( user => {
        this.currentUser = user;
      });
  }

  logout() {
    this.authenticationService.logOut();
  }

  scrollToElement($e) {
    this.scrollService.scrollToElement($e);
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

}
