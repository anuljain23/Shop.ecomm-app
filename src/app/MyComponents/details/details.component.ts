import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  productData:Product|undefined
  productQuantity:number = 1
  removeFromCart = false;
  
  constructor(private activeRoute:ActivatedRoute,private product:ProductsService){}

  ngOnInit(){
    let productId = this.activeRoute.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((result)=>{
      if(result){
        this.productData = result
        let cartData = localStorage.getItem('localCart')
        if(productId && cartData){
          let cartItems = JSON.parse(cartData)
          cartItems = cartItems.filter((item:Product)=>productId === item.id.toString())
          if(cartItems.length){
            this.removeFromCart = true
          }else{
            this.removeFromCart = false
          }
        }
      }else{
        this.productData = undefined
        // if product not found redirect to 404 not found page
      }
    })

  }

  handleQuantity(operation:string){
    if(this.productQuantity < 20 && operation === "plus"){
      this.productQuantity+=1
    }else if(this.productQuantity > 1 && operation === "minus"){
      this.productQuantity-=1
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.addToLocalCart(this.productData);
        this.removeFromCart = true
      }else{
        console.log(this.productData);        
      }
    }
  }

  removeItemFromCart(productId:number){
    this.product.removeItemFromCart(productId)
    this.removeFromCart = false
  }

}
