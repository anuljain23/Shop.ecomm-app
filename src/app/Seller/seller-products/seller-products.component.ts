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
  actionProductMessageSuccess:string|undefined
  actionProductMessageError:string|undefined
  sellerId:number = 0

  constructor(private product:ProductsService){}

  ngOnInit(){
    if(localStorage.getItem('seller')){
      let sellerStore = localStorage.getItem('seller');
      let sellerData = sellerStore && JSON.parse(sellerStore)[0];
      this.sellerId = sellerData.id;
    }   
    this.getAllProductList(this.sellerId);
  }

  getAllProductList(sellerId:number){
    this.product.allProductBySeller(sellerId).subscribe((result)=>{
      if(result){
        this.productList = result;
      }
    });
  }

  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.actionProductMessageSuccess = "Product Deleted Successfully!"
        this.getAllProductList(this.sellerId);
      }else{
        this.actionProductMessageError = "Something Went Wrong. Please Try Again!"
      }
    })
    setTimeout(()=>{
      this.actionProductMessageError = undefined
      this.actionProductMessageSuccess = undefined
    },3000)
  }

}
