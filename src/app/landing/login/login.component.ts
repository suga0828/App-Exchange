import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
  }

  successCallback(response: FirebaseUISignInSuccessWithAuthResult) {
    const currentUser = response.authResult.user;
    if (response.authResult.additionalUserInfo.isNewUser) {
      const newUser: NewUser = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        isVerified: false,
        isAdmin: false,
        balance: 0
      };
      this.userService.createUser(newUser);
    }
    if (response.authResult.additionalUserInfo.isNewUser && response.authResult.additionalUserInfo.providerId === 'password') {
      currentUser.sendEmailVerification();
    }
    console.log('Sesión iniciada');
    this.ngZone.run( () => {
      this.router.navigate(['/console']);
    });
  }

  errorCallback(errorData) {
    console.log(errorData);
  }

}
