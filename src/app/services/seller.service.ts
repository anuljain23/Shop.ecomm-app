import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellerSignIn, SellerSignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  sellerAPIUrl: string = 'http://localhost:3000/seller';

  //BehaviorSubject changes its value whenever susbcribed
  isSellerSignedIn = new BehaviorSubject<boolean>(false);

  //If Singin credentials are invalid emit error
  isSignInError = new EventEmitter<boolean>(false)

  //instance fo HttpClient
  constructor(private http: HttpClient, private router: Router) {}

  sellerSignUp(data: SellerSignUp) {
    this.http
      .post(this.sellerAPIUrl, data, { observe: 'response' })
      //subscribe() allows you to get the API data in multiple places
      .subscribe((result) => {
        this.isSellerSignedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-product']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerSignedIn.next(true);
      this.router.navigate(['seller-product']);
    }
  }

  sellerSignIn(data: SellerSignIn) {
    this.http
      .get(
        this.sellerAPIUrl + `?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result:any) => {
        if(result && result.body && result.body.length){
          this.isSellerSignedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-product']);
        }else{
          this.isSignInError.emit(true)      
        }
      });
  }
}
