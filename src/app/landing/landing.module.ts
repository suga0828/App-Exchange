import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LoginComponent } from './login/login.component';

import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiAuthConfig } from '../services/authentication.service';

import { HeaderComponent } from './header/header.component';
import { JumboComponent } from './jumbo/jumbo.component';
import { ExperienceComponent } from './experience/experience.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { FooterComponent } from './footer/footer.component';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,

    LandingRoutingModule,

    FirebaseUIModule.forRoot(firebaseUiAuthConfig),

    SharedModule
  ],
  declarations: [
    LandingComponent,
    HeaderComponent,
    JumboComponent,
    ExperienceComponent,
    WithdrawComponent,
    TransferComponent,
    TestimonyComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent
  ]
})
export class LandingModule { }
