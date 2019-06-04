import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Operation } from '../../interfaces/operation';

import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit, OnChanges {

  @Input() public currentUser: User;

  messages = [
    'Aún no tiene operaciones realizadas.',
  ];

  operations: Operation[];

  dataSource: any;
  displayedColumns: string[] = ['date', 'type', 'origin_account', 'amount', 'destination_account', 'status', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userService: UserService
    ) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.currentUser) {
      this.getOperations();
    }
  }

  getOperations() {
    this.userService.getUserOperations(this.currentUser.uid)
      .subscribe( (operations: Operation[]) => {
        this.dataSource = new MatTableDataSource(operations.reverse());
        this.dataSource.paginator = this.paginator;
      }, (err) => {
          this.dataSource = new MatTableDataSource();
          console.error(err);
      });
  }

  openDialog(action: string, user?: User, operation?: Operation) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '360px',
      data: {
        action: action,
        user: user,
        operation: operation
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.openSnackBar(result.message);
        }
      }, error => {
        console.error(error);
      });
  }

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

}
