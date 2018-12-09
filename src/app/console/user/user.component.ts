import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.authenticationService.getStatus()
      .subscribe( response => {
        if (response.emailVerified) {
          console.log(response.providerData[0]);
          this.user = response.providerData[0];
        } else {
          this.user = 'Por favor verificar email.';
        }
      }, error => console.log(error) );
  }

  logOut() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }

}
