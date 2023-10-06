import { Component } from '@angular/core';
import { Cart, Product, UserSignIn, UserSignUp } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin = true;
  errorMessage:string|undefined
  currentCartList:Cart[]|undefined

  constructor(private user:UserService, private product:ProductsService){}

  ngOnInit(){
    this.user.reloadUser()
  }

  toggleForm(){
    this.showLogin = !this.showLogin
  }

  createUserAccount(data:UserSignUp){
      this.user.addUser(data);
  }

  signInUser(formData:UserSignIn){
    this.user.userSignIn(formData)
    this.user.invalidUser.subscribe((result)=>{
      if(result){
        this.errorMessage = "Please Eneter Valid Email And Password"
      }else{
        this.localCartToRemoteCart()
      }
    })
  }

  localCartToRemoteCart(){
    let cartData = localStorage.getItem('localCart')
    let userData = localStorage.getItem('user')
    let userId = userData && JSON.parse(userData).id
    if(cartData){
      let cartItemList:Product[] = JSON.parse(cartData)
      cartItemList.forEach((product:Product,index)=>{
        let cart:Cart = {
          ...product,
          userId,
          productId:product.id
        }
        delete cart.id
        setTimeout(()=>{
          this.product.addToCart(cart).subscribe((result)=>{
            if(result){
              console.log('Item added to db');              
            }
          })
          if(cartItemList.length === index+1){
            localStorage.removeItem('localCart')
          }
        },500)
      }) 
    }
    setTimeout(()=>{
      this.product.getCartList(userId); 
    },2000)
  }

}
