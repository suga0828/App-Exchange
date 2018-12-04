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
      .subscribe( response => this.user = response, error => console.log(error) );
    console.log(this.user);
  }

  logOut() {
    console.log(this.user);
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
  }

}
