import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LandingModule } from './landing/landing.module';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/landing',
		pathMatch: 'full'
	},
	{
		path: "landing",
		loadChildren: "./landing/landing.module#LandingModule"
	},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
