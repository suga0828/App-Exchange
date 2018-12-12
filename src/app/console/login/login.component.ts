import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { NewUser } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  successCallback(response) {
    if (response.authResult.additionalUserInfo.isNewUser) {
      response.authResult.user.sendEmailVerification();
      const newUser: NewUser = {
        uid: response.authResult.user.uid,
        displayName: response.authResult.user.displayName,
        email: response.authResult.user.email,
        emailVerified: response.authResult.user.emailVerified,
        providerId: response.authResult.additionalUserInfo.providerId,
      };
        this.userService.createUser(newUser);
      }
    this.router.navigate(['console/user'], { queryParams: {
      uid: response.authResult.user.uid,
      emailVerified: response.authResult.user.emailVerified,
    }});
  }

  errorCallback(errorData) {
    console.log(errorData);
  }

}
