import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { Operation } from '../../interfaces/operation';

import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit, OnDestroy {

  userSubscription;
  operationsSubscription;

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
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.getOperations();
  }

  getOperations() {
    this.userSubscription = this.authenticationService.getStatus()
      .subscribe( currentUser => {
        this.operationsSubscription = this.userService.getUserOperations(currentUser.uid)
          .subscribe( (operations: Operation[]) => {
            this.dataSource = new MatTableDataSource(operations.reverse());
            console.log(operations);
            this.dataSource.paginator = this.paginator;
          }, (err) => {
              this.dataSource = new MatTableDataSource();
              console.log(err);
          });
      }); 
  }

  openDialog(op: string, id: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        operation: op,
        id: id
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.openSnackBar(result.message);
          this.getOperations();
        }
      }, error => {
        console.log(error);
      });
  }

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  ngOnDestroy() {
    this.operationsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
