import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, orders, priceSummary } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  delivery=0
  priceSummary:priceSummary = {
    price:0,
    tax:0,
    discount:0,
    delivery:0,
    total:0
  }
  orderMsg:string|undefined
  total:number=0
  currentCartData:Cart[]|undefined

  constructor(private product:ProductsService, private router:Router){}

  ngOnInit() {
    this.loadCartData()    
  }

  orderNow(data:orders){
    let user = localStorage.getItem('user')
    if(user){      
      let userId = user && JSON.parse(user).id
      if(data){
        this.currentCartData?.forEach((item)=>{
          let orderData:orders = {
            ...data,
            ...item
          }
          delete orderData.id
          setTimeout(()=>{
            this.product.orderNow(orderData).subscribe((result)=>{
              if(result){
                this.orderMsg = "Your Order Has Been Placed"
              }
            })
            item.id && this.product.removeFromCartRemote(item.id).subscribe((result)=>{
              if(result){
                this.product.getCartList(userId)
              }
            })
          },500)
        })
      }
      setTimeout(()=>{
        this.router.navigate(['/my-orders'])
        this.orderMsg = undefined
      },3000)
    }else{
      console.log('hi');
      
      this.orderMsg = "Please Login To Place Order!"
      setTimeout(()=>{
        this.router.navigate(['/user-auth'])
        this.orderMsg = undefined
      },3000)
    }
  }

  loadCartData(){
    let delivery=0
    if(localStorage.getItem('user')) {
      this.product.currentCart().subscribe((result)=>{
        if(result.length){
          delivery=40
        }
        this.currentCartData = result 
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
