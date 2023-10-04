import { Component } from '@angular/core';
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
  delivery=0
  priceSummary:priceSummary = {
    price:0,
    tax:0,
    discount:0,
    delivery:0,
    total:0
  }

  constructor(private product:ProductsService){}

  ngOnInit() {

    if(localStorage.getItem('user')) {
      this.product.currentCart().subscribe((result)=>{
        if(result.length){
          this.delivery=40
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
          delivery:this.delivery,
          total:+((price)+(price*12/100)+(this.delivery)-(price*5/100)).toFixed()
        }
      })      
    }

    // get count of local cart on initialization
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.delivery = 40
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
          delivery:this.delivery,
          total:+((price)+(price*12/100)+(this.delivery)-(price*5/100)).toFixed()
        }
    }    
  }
}
