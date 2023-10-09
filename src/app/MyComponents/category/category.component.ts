import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  productList:Product[] = []
  categoryName:string|undefined
  
  constructor(private activeRoute:ActivatedRoute,private product:ProductsService,private router:Router){}

  ngOnInit(){
    let categoryName = this.activeRoute.snapshot.paramMap.get('name')
    if(categoryName){
      this.categoryName = categoryName
      this.product.productsByCategory(categoryName).subscribe((result)=>{
        if(result){
          this.productList = result
        }else{
          this.productList = []
        }
      })
    }
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
