import { Component, OnInit, Input } from '@angular/core';

import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
