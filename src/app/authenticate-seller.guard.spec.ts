import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticateSellerGuard } from './authenticate-seller.guard';

describe('authenticateSellerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticateSellerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
