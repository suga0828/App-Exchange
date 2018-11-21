import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JumboComponent } from './jumbo/jumbo.component';
import { ExperienceComponent } from './experience/experience.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';

import { LandingRoutingModule } from './landing-routing.module';

import { FormsModule } from '@angular/forms';
import { TestimonyComponent } from './testimony/testimony.component';

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
  	TransferComponent,
  	TestimonyComponent]
})
export class LandingModule { }
