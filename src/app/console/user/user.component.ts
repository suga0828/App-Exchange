import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  uid: string;
  emailVerified: string;
  message: string;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    if (this.emailVerified === 'false') {
      this.message = 'Por favor verifique su correo electrónico';
    }
  }

  getUser() {
    this.getUserId()
      .subscribe( params => {
        this.uid = params.uid;
        this.emailVerified = params.emailVerified;
        console.log(params);
        this.userService.getUserById(this.uid)
          .subscribe( (response: User) => {
            console.log(response);
            this.user = response;
          }, error => console.log(error)
          );
      });
  }

  getUserId() {
    return this.activatedRoute.queryParams;
  }

  logOut() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }

}
