import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  authResult = this.authenticationService.authResult;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.authenticationService.getStatus()
      .subscribe( response => {
        if (response.emailVerified) {
          this.user = response.providerData;
          this.user = JSON.stringify(this.user);
        } else {
          this.user = 'Por favor verificar email.';
        }
      }, error => console.log(error) );
  }

  logOut() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
  }

}
