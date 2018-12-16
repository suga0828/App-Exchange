import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  successCallback(response: FirebaseUISignInSuccessWithAuthResult) {
    const currentUser = response.authResult.user;
    if (response.authResult.additionalUserInfo.isNewUser) {
      currentUser.sendEmailVerification();
      const newUser: NewUser = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
      };
      this.userService.createUser(newUser);
    }
    console.log('Sesión iniciada');
    this.authenticationService.setUser(currentUser);
    this.router.navigate(['console/user']);
  }

  errorCallback(errorData) {
    console.log(errorData);
  }

}
