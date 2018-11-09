import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { HistoricalComponent } from './historical/historical.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'user',
		pathMatch: 'full'
	},
	{ path: "user", component: UserComponent },
	{ path: "transfer", component: TransferComponent },
	{ path: "withdraw", component: WithdrawComponent },
	{ path: "historical", component: HistoricalComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConsoleRoutingModule { }

