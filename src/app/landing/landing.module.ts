import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JumboComponent } from './jumbo/jumbo.component';
import { ExperienceComponent } from './experience/experience.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { TestimonyComponent } from './testimony/testimony.component';

import { LandingRoutingModule } from './landing-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,

    LandingRoutingModule,

    SharedModule
  ],
  declarations: [
    JumboComponent,
    ExperienceComponent,
    WithdrawComponent,
    TransferComponent,
    TestimonyComponent
  ]
})
export class LandingModule { }
