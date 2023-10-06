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

    if(localStorage.getItem('user')) {
      this.product.currentCart().subscribe((result)=>{
        if(result.length){
          this.delivery=40
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
          delivery:this.delivery,
          total:+((price)+(price*12/100)+(this.delivery)-(price*5/100)).toFixed()
        }
        this.total = this.priceSummary.total
      })      
    }    
  }

  orderNow(data:orders){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if(this.total){
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
    },5000)
  }

}
