import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  public currentUser: User;

  view = 'userView';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authenticationService.getStatus()
      .subscribe( user => {
        this.userService.getUserById(user.uid)
          .subscribe( (currentUser: User) => {
            this.currentUser = currentUser;
          } )
      }, error => console.log(error));
  }

  changeView(view: string) {
    this.view = view;
  }

}
