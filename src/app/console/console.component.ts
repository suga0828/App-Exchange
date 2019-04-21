import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  user: string;
  transfer: string;
  withdraw: string;
  historical: string;
  admin: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/console/user') {
      this.user = this.router.url;
    }
    else if (this.router.url === '/console/transfer') {
      this.transfer = this.router.url;
    }
    else if (this.router.url === '/console/withdraw') {
      this.withdraw = this.router.url;
    }
    else if (this.router.url === '/console/historical') {
      this.historical = this.router.url;
    }
    else if (this.router.url === '/console/admin') {
      this.admin = this.router.url;
    }
  }

}
