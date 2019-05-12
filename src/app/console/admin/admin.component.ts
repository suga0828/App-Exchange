import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Plataform } from 'src/app/interfaces/plataform';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  plataforms: any;
  plataformsColumns: string[] = ['name', 'tax', 'plataformsOptions'];
  @ViewChild(MatPaginator) platformsPaginator: MatPaginator;
  
  users: any;
  usersColumns: string[] = ['displayName', 'idDocument', 'idDocumentImage', 'status', 'usersOptions'];
  @ViewChild(MatPaginator) usersPaginator: MatPaginator;

  newPlataform: string;
  newComission: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.getPlataforms();
  }

  getPlataforms() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = new MatTableDataSource(plataforms);
        this.plataforms.paginator = this.platformsPaginator;
      });
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe( (users: User[]) => {
        this.users = new MatTableDataSource(users);
        this.users.paginator = this.usersPaginator;
      });
  }

  registerPlataform() {
    const id = Date.now();
    this.userService.registerPlataform('Plataforma', id);
  }

}
