import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: './console/console.module#ConsoleModule'
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '/landing' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
