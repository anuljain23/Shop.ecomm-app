import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellerSignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  sellerAPIUrl: string = 'http://localhost:3000/seller';
  //BehaviorSubject changes its value whenever susbcribed
  isSellerSignedIn = new BehaviorSubject<boolean>(false);
  //instance fo HttpClient
  constructor(private http: HttpClient, private router: Router) {}

  sellerSignUp(data: SellerSignUp) {
    this.http
      .post(this.sellerAPIUrl, data, { observe: 'response' })      
      //subscribe() allows you to get the API data in multiple places
      .subscribe((result) => {
        this.isSellerSignedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerSignedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

}
