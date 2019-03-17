import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  login: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/landing/login') {
      this.login = this.router.url;
    }
  }

}
