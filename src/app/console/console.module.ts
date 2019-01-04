import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { UserComponent } from './user/user.component';
import { HistoricalComponent } from './historical/historical.component';
import { LoginComponent } from './login/login.component';

import { ConsoleRoutingModule } from './console-routing.module';

import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiAuthConfig } from '../services/authentication.service';

import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [TransferComponent, WithdrawComponent, UserComponent, HistoricalComponent, LoginComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    SharedModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ]
})
export class ConsoleModule { }
