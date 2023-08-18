import { Component } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent {
  
  productList:undefined|Product[]

  constructor(private product:ProductsService){}

  ngOnInit(){
    this.product.allProductList().subscribe((result)=>{
      if(result){
        this.productList = result;
      }
    });
  }

}
