import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { Operations } from '../../interfaces/operation';

import { MatTableDataSource, MatPaginator } from '@angular/material';

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

  operations: Operations[];

  dataSource: any;
  displayedColumns: string[] = ['date', 'type', 'origin_account', 'amount', 'destination_account', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
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
          .subscribe( (operations: Operations[]) => {
            this.dataSource = new MatTableDataSource(operations);
            console.log(operations);
            this.dataSource.paginator = this.paginator;
          }, (err) => {
              this.dataSource = new MatTableDataSource();
              console.log(err);
          });
      }); 
  }

  ngOnDestroy() {
    this.operationsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
