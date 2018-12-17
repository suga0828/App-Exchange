import { TestBed, async, inject } from '@angular/core/testing';

import { NoAuthenticationGuard } from './no-authentication.guard';

describe('NoAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAuthenticationGuard]
    });
  });

  it('should ...', inject([NoAuthenticationGuard], (guard: NoAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
