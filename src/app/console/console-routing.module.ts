import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsoleComponent } from './console.component';

import { AdminGuard } from '../services/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  { path: 'user', component: ConsoleComponent },
  { path: 'transfer', component: ConsoleComponent },
  { path: 'withdraw', component: ConsoleComponent },
  { path: 'historical', component: ConsoleComponent },
  { path: 'admin', component: ConsoleComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConsoleRoutingModule { }

