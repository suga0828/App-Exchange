import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material Components
import { MatNativeDateModule, MatButtonModule, MAT_DATE_LOCALE, MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ReactiveFormsModule, FormsModule,

    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCardModule,
    FontAwesomeModule
  ],
  exports: [
    ReactiveFormsModule, FormsModule,

    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCardModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
