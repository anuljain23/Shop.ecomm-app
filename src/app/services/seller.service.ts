import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellerSignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  sellerAPIUrl:string = 'http://localhost:3000/seller'
  //instance fo HttpClient
  constructor(private http:HttpClient) { }

  sellerSignUp(data:SellerSignUp){
    return this.http.post(this.sellerAPIUrl,data)
  }

}
