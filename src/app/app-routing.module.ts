import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {
    path: 'console',
    loadChildren: './console/console.module#ConsoleModule',
    canActivate: [AuthenticationGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '/landing' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
