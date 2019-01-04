import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './landing/header/header.component';
import { FooterComponent } from './landing/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCheck, faEdit, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faGrinAlt, faClock, faCheckSquare, faTimesCircle, faPlusSquare } from '@fortawesome/free-regular-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faUserCheck, faThumbsUp, faGrinAlt, faClock, faEdit, faCheckSquare, faTimesCircle, faArrowCircleUp, faPlusSquare);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase, 'App-Exchange'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
