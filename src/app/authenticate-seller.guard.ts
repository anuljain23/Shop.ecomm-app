import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authenticateSellerGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  if(localStorage.getItem('seller')){
    return true;
  }
  return sellerService.isSellerSignedIn;
};
