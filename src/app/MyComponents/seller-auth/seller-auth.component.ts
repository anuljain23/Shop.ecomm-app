import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Router } from '@angular/router';
import { SellerSignIn, SellerSignUp } from 'src/app/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent{
  
  ngOnInit(){
    this.seller.reloadSeller();
  }

  errorMessage = ''
  showLogin = true;
  //router to navigate to the seller home page after successful signup
  constructor(private seller:SellerService, private router:Router){}
  
  signUp(formData:SellerSignUp){  
    this.seller.sellerSignUp(formData)
  }

  signIn(formData:SellerSignIn){
    this.errorMessage = '';
    this.seller.sellerSignIn(formData);    
    this.seller.isSignInError.subscribe((isError)=>{
      if(isError){
        this.errorMessage = 'Invalid Email or Password';
      }
    })
  }

  toggleSiginUpSignIn(){
    this.showLogin = !this.showLogin
  }

}
