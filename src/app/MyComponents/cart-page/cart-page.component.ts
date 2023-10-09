import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {

  cartItems = 0;
  currentCartData:Cart[]|undefined
  priceSummary:priceSummary = {
    price:0,
    tax:0,
    discount:0,
    delivery:0,
    total:0
  }

  constructor(private product:ProductsService, private router:Router){}

  ngOnInit() {
    this.loadCartData()
  }

  checkout(){
    if(localStorage.getItem('user')) {      
      this.router.navigate(["/checkout"])
    }else{
      alert("Please Login To Checkout!")
      this.router.navigate(["/user-auth"])
    }
  }

  removeFromCart(cartId:number|undefined){
    if(!localStorage.getItem('user')){
      cartId && this.product.removeItemFromCart(cartId)
    }else{
      let userData = localStorage.getItem('user')
      let userId = userData && JSON.parse(userData).id
      cartId && this.product.removeFromCartRemote(cartId)
      .subscribe((result)=>{
        if(result){
          this.product.getCartList(userId)
        }
      })
    }
    this.loadCartData()
  }

  loadCartData(){
    let delivery=0
    if(localStorage.getItem('user')) {
      this.product.currentCart().subscribe((result)=>{
        if(result.length){
          delivery=40
        }
        this.currentCartData = result 
        this.cartItems = result.length
        let price = 0;
        result.forEach((item)=>{
          if(item.quantity){
            price=price+((+item.productPrice)*item.quantity)
          }
        })
        this.priceSummary={
          price:price,
          discount:price*5/100,
          tax:price*12/100,
          delivery:delivery,
          total:+((price)+(price*12/100)+(delivery)-(price*5/100)).toFixed()
        }
      })      
    }

    // get count of local cart on initialization
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      delivery = 40
      this.currentCartData = JSON.parse(cartData)
      this.cartItems = JSON.parse(cartData).length;
      let price = 0;
      if(this.currentCartData){
        this.currentCartData.forEach((item)=>{
          if(item.quantity){
            price=price+((+item.productPrice)*item.quantity)
          }
        })
      }
      this.priceSummary={
        price:price,
        discount:price*5/100,
        tax:price*12/100,
        delivery:delivery,
        total:+((price)+(price*12/100)+(delivery)-(price*5/100)).toFixed()
      }
    }else if(!cartData){
      delivery = 0
      this.currentCartData = undefined
      this.cartItems = 0
      let price = 0;
      this.priceSummary={
        price:price,
        discount:price*5/100,
        tax:price*12/100,
        delivery:delivery,
        total:+((price)+(price*12/100)+(delivery)-(price*5/100)).toFixed()
      }
    }
  }

}
