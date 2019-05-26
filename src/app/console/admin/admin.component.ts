import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Plataform } from '../../interfaces/plataform';
import { Operation } from '../../interfaces/operation';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnChanges {

  @Input() public currentUser: User;

  plataforms: any;
  plataformsColumns: string[] = ['name', 'tax', 'plataformsOptions'];
  @ViewChild(MatPaginator) platformsPaginator: MatPaginator;
  
  users: any;
  usersColumns: string[] = ['displayName', 'country', 'idDocument', 'idDocumentImage', 'status', 'usersOptions'];
  @ViewChild(MatPaginator) usersPaginator: MatPaginator;

  newPlataform: string;
  newComission: number;

  purchaseOperations: any;
  @ViewChild(MatPaginator) purchaseOperationsPaginator: MatPaginator;

  salesOperations: any;
  @ViewChild(MatPaginator) salesOperationsPaginator: MatPaginator;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.currentUser) {
      this.getUsers();
      this.getPlataforms();
      this.getOperations();
    }
  }

  getPlataforms() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = new MatTableDataSource(plataforms);
        this.plataforms.paginator = this.platformsPaginator;
      });
  }

  getOperations() {
    this.userService.getOperations()
      .subscribe( (operations: Operation[]) => {
        this.purchaseOperations = new MatTableDataSource(operations);
        this.purchaseOperations.paginator = this.purchaseOperationsPaginator;
        this.salesOperations = new MatTableDataSource(operations);
        this.salesOperations.paginator = this.salesOperationsPaginator;
      });
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe( (users: User[]) => {
        this.users = new MatTableDataSource(users);
        this.users.paginator = this.usersPaginator;
      });
  }

  openDialog(action: string, uid?: string, date?: number, plataform?: Plataform) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '360px',
      data: {
        action: action,
        uid: uid,
        date: date,
        plataform: plataform,
      }
    });
    dialogRef.afterClosed()
    .subscribe( result => {
      if (result) {
        //- Poner Condicional
        this.openSnackBar(result.message, result.action, result.time);
      }
    }, error => {
      console.log(error);
      this.openSnackBar('Ocurrió un error al realizar la operación', error);
    });
  }

  openSnackBar(message: string, action: string = '', time?: number) {
    this.snackBar.open(message, action, {
      duration: time || 2500,
    });
  }


}
