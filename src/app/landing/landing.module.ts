import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JumboComponent } from './jumbo/jumbo.component';
import { ExperienceComponent } from './experience/experience.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';

import { LandingRoutingModule } from './landing-routing.module';

import { FormsModule } from '@angular/forms';
import { TestimonyComponent } from './testimony/testimony.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faGrinAlt,faClock } from '@fortawesome/free-regular-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faUserCheck, faThumbsUp, faGrinAlt, faClock);


@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
  	JumboComponent,
  	ExperienceComponent,
  	WithdrawComponent,
  	TransferComponent,
  	TestimonyComponent]
})
export class LandingModule { }
