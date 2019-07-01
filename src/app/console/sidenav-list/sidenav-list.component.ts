import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;
  @Input('currentUser') currentUser: User;

  @Output() view = new EventEmitter<String>();
  @Output() logout = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  changeView(view: String) {
    this.view.emit(view);
  }

  emitLogout(e: boolean) {
    this.logout.emit(e);
  }
}
