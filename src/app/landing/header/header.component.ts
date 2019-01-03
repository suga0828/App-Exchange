import { Component, OnInit } from '@angular/core';

import { ScrollService } from '../../services/scroll.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
        console.log(user);
      });
  }

  scrollToElement($e) {
    this.scrollService.scrollToElement($e);
  }

}
