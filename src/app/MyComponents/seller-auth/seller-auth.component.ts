import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Router } from '@angular/router';
import { SellerSignUp } from 'src/app/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  
  //router to navigate to the seller home page after successful signup
  constructor(private seller:SellerService, private router:Router){}

  signUp(formData:SellerSignUp){  
    //subscribe() allows you to get the API data in multiple places
    this.seller.sellerSignUp(formData).subscribe((result)=>{
      if(result){
        this.router.navigate(['seller-home']);
      }    
    });
  }

}
