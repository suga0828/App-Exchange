import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsoleComponent } from './console.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  { path: 'user', component: ConsoleComponent },
  { path: 'transfer', component: ConsoleComponent },
  { path: 'withdraw', component: ConsoleComponent },
  { path: 'historical', component: ConsoleComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConsoleRoutingModule { }

