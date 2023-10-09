import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent {

  bestSellerProductList:undefined|Product[]
  constructor(private product:ProductsService, private router:Router){}

  ngOnInit(){
    this.product.bestSellerProducts().subscribe((data)=>{
      if(data){
        this.bestSellerProductList = data
      }
    })
  }

  buyNow(productData:Product){
    if(productData){
      productData.quantity = 1;
      if(!localStorage.getItem('user')){
        this.product.addToLocalCart(productData);
      }else{
        let userData = localStorage.getItem('user')
        let userId = userData && JSON.parse(userData).id
        let cartData:Cart = {
          ...productData,
          userId,
          productId: productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId)
          }
        })    
      }
      this.router.navigate(['checkout'])
    }
  }

}
