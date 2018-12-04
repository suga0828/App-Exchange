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

@NgModule({
  declarations: [TransferComponent, WithdrawComponent, UserComponent, HistoricalComponent, LoginComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ]
})
export class ConsoleModule { }
