import { Component, Input, OnInit, OnChanges, ViewChildren, QueryList, OnDestroy } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Plataform } from '../../interfaces/plataform';
import { Operation } from '../../interfaces/operation';
import { Rate } from '../../interfaces/rate';

import { ModalComponent } from '../modal/modal.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public currentUser: User;
  usersSubscription: Subscription;
  operationsSubscription: Subscription;

  exchangeRates: Rate[];
  plataforms: any;
  plataformsColumns: string[] = ['name', 'tax', 'plataformsOptions'];
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  
  users: any;
  usersColumns: string[] = ['displayName', 'country', 'phoneNumber', 'idDocument', 'idDocumentImage', 'status', 'usersOptions'];

  newPlataform: string;
  newComission: number;

  purchasesOperations: any;
  purchasesColumns: string[] = ['date', 'originAccount', 'amount', 'destinationAccount', 'status', 'purchasesOptions'];

  salesOperations: any;
  salesColumns: string[] = ['dateSales', 'originAccountSales', 'amountSales', 'status', 'salesOptions'];  

  purchases: Operation[] = [];
  sales: Operation[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.getExchangeRates();
    this.getPlataforms();
  }

  ngOnChanges() {
    if (this.currentUser) {
      this.getUsers();
      this.getOperations();
    }
  }

  getPlataforms() {
    this.userService.getPlataforms()
      .subscribe( (plataforms: Plataform[]) => {
        this.plataforms = new MatTableDataSource(plataforms);
        this.plataforms.paginator = this.paginator.toArray()[0];
      });
  }

  getUsers() {
    this.usersSubscription = this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = new MatTableDataSource(users);
        this.users.paginator = this.paginator.toArray()[1];
      });
  }

  getOperations() {
    this.operationsSubscription = this.userService.getOperations()
      .subscribe( (allOperations: Operation[][]) => {
        this.purchases = [];
        this.sales = [];
        for(let i = 0; i < allOperations.length; i++) {
          const opsByUser: Operation[] = Object.values(allOperations[i]);
          for (let e = 0; e < opsByUser.length; e++) {
            if (opsByUser[e].destinationAccount) {
              this.purchases.push(opsByUser[e]);
            } else {
              this.sales.push(opsByUser[e]);
            }
          }
        }
        this.purchases = this.purchases.sort( (a, b) => {
          if (a.date > b.date) {
            return 1;
          }
          if (a.date < b.date) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }).reverse();
        this.sales = this.sales.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          }
          if (a.date < b.date) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }).reverse();
        this.purchasesOperations = new MatTableDataSource(this.purchases);
        this.purchasesOperations.paginator = this.paginator.toArray()[2];
        this.salesOperations = new MatTableDataSource(this.sales);
        this.salesOperations.paginator = this.paginator.toArray()[3];
      });
  }

  getExchangeRates() {
    this.userService.getExchangeRates()
      .subscribe( (rates: Rate[]) => {
        this.exchangeRates = rates;
      }, error => console.error(error));
  }

  openDialog(action: string, user?: User, operation?: Operation, plataform?: Plataform, exchangeRate?: Rate) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '360px',
      data: {
        action: action,
        user: user,
        operation: operation,
        plataform: plataform,
        exchangeRate: exchangeRate
      }
    });
    dialogRef.afterClosed()
    .subscribe( result => {
      if (result) {
        //- Poner Condicional
        this.openSnackBar(result.message, result.action, result.time);
      }
    }, error => {
      console.error(error);
      this.openSnackBar('Ocurrió un error al realizar la operación', error);
    });
  }

  openSnackBar(message: string, action: string = '', time?: number) {
    this.snackBar.open(message, action, {
      duration: time || 2500,
    });
  }
  
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.operationsSubscription.unsubscribe();
  }
}
