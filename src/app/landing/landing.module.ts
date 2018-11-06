import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JumboComponent } from './jumbo/jumbo.component';
import { ExperienceComponent } from './experience/experience.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';

import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  declarations: [
  	JumboComponent,
  	ExperienceComponent,
  	WithdrawComponent,
  	TransferComponent]
})
export class LandingModule { }
