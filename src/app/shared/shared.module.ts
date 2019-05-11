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
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Operaciones por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Pagina anterior';
  paginatorIntl.getRangeLabel = spanishRangeLabel;

  return paginatorIntl;
}

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
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,

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
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,

    FontAwesomeModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})
export class SharedModule { }
