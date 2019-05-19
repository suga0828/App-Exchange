import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() { }

  successCallback(response: FirebaseUISignInSuccessWithAuthResult) {
    this.loading = true;
    const currentUser = response.authResult.user;   
    if (response.authResult.additionalUserInfo.isNewUser) {
      const newUser: User = {
        balance: 0,
        email: currentUser.email,
        displayName: currentUser.displayName,
        isVerified: false,
        uid: currentUser.uid
      };
      if (response.authResult.additionalUserInfo.providerId === 'password') {
        currentUser.sendEmailVerification();
      }
      this.userService.createUser(newUser);
    }
    if (response.authResult.additionalUserInfo.providerId === 'password') {
      if(currentUser.emailVerified === false) {
        swal.fire({
          type: 'warning',
          title: 'Por favor verifique su correo',
          showConfirmButton: false,
          timer: 1500
        });
      }
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
