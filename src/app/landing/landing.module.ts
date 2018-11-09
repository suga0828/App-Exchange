import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JumboComponent } from './jumbo/jumbo.component';
import { ExperienceComponent } from './experience/experience.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';

import { LandingRoutingModule } from './landing-routing.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule
  ],
  declarations: [
  	JumboComponent,
  	ExperienceComponent,
  	WithdrawComponent,
  	TransferComponent]
})
export class LandingModule { }
