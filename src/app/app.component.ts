import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App-Exchange';
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    console.log(this.router.url);
  }
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.authenticationService.getStatus()
      .subscribe( (user: User) => {
        this.currentUser = user;
        console.log(user);
      });
  }
  logOut() {
    this.authenticationService.logOut();
    console.log('Sesión cerrada.');
    this.router.navigate(['console/login']);
  }
}
