import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCountriesService {

  countries = [
    { name: 'Argentina', dial_code: '+54'},
    { name: 'Aruba', dial_code: '+297'},
    { name: 'Belice', dial_code: '+501'},
    { name: 'Bolivia', dial_code: '+591' },
    { name: 'Brasil', dial_code: '+55'},
    { name: 'Canadá', dial_code: '+1' },
    { name: 'Chile', dial_code: '+56' },
    { name: 'Colombia', dial_code: '+57' },
    { name: 'Costa Rica', dial_code: '+506' },
    { name: 'Cuba', dial_code: '+53' },
    { name: 'Curazao', dial_code: '+599' },
    { name: 'Ecuador', dial_code: '+593' },
    { name: 'El Salvador', dial_code: '+503' },
    { name: 'Estados Unidos', dial_code: '+1' },
    { name: 'Guatemala', dial_code: '+502' },
    { name: 'Honduras', dial_code: '+504' },
    { name: 'Nicaragua', dial_code: '+505' },
    { name: 'México', dial_code: '+52' },
    { name: 'Panamá', dial_code: '+507' },
    { name: 'Paraguay', dial_code: '+595' },
    { name: 'Peru', dial_code: '+51' },
    { name: 'Republica Dominicana', dial_code: '+1-809, +1-829 ó +1-849' },
    { name: 'Uruguay', dial_code: '+598' },
    { name: 'Venezuela', dial_code: '+58'},
  ];
  constructor() { }

  getCountries(): Observable<any[]> {
    return of(this.countries);
  }
}
