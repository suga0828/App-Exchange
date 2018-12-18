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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransferComponent, WithdrawComponent, UserComponent, HistoricalComponent, LoginComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    FontAwesomeModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ]
})
export class ConsoleModule { }
