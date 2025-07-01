import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { identificationGuard } from './identification.guard';

describe('identificationGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => identificationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
