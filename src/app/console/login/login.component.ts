import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  successCallback(response) {
    console.log(response);
    if (response.authResult.additionalUserInfo.isNewUser) {
        response.authResult.user.sendEmailVerification();
      }
    this.router.navigate(['console/user']);
  }

  errorCallback(errorData) {
    console.log(errorData);
  }

}
