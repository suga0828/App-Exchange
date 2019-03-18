import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActive = false;

  currentUser: User;

  constructor(
    private scrollService: ScrollService,
    private authenticationService: AuthenticationService) { }

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
  }

  scrollToElement($e) {
    this.scrollService.scrollToElement($e);
  }

  toggleMenu(event) {
    this.isActive = !this.isActive;
  }

}
