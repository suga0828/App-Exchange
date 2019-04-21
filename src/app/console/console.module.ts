import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { UserComponent } from './user/user.component';
import { HistoricalComponent } from './historical/historical.component';
import { AdminComponent } from './admin/admin.component';

import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [TransferComponent, WithdrawComponent, UserComponent, HistoricalComponent, ConsoleComponent, SidenavListComponent, AdminComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ]
})
export class ConsoleModule { }
