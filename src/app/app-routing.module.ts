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
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'console',
    loadChildren: () => import('./console/console.module').then(m => m.ConsoleModule),
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
