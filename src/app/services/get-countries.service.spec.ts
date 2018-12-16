import { TestBed } from '@angular/core/testing';

import { GetCountriesService } from './get-countries.service';

describe('GetCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCountriesService = TestBed.get(GetCountriesService);
    expect(service).toBeTruthy();
  });
});
