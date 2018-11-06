import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JumboComponent } from './jumbo/jumbo.component';

const routes: Routes = [
	{ path: "", component: JumboComponent}
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LandingRoutingModule { }
