import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { HistoricalComponent } from './historical/historical.component';
import { LoginComponent} from './login/login.component';

import { AuthenticationGuard } from '../services/authentication.guard';
import { NoAuthenticationGuard } from '../services/no-authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthenticationGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthenticationGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthenticationGuard] },
  { path: 'historical', component: HistoricalComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConsoleRoutingModule { }

