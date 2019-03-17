import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing.component';

import { NoAuthenticationGuard } from '../services/no-authentication.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LandingComponent, canActivate: [NoAuthenticationGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LandingRoutingModule { }
