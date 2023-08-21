import { Component } from '@angular/core';
import { Product, category } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductSuccess: string | undefined
  addProductError: string | undefined
  categories:undefined | category[]
  sellerId:number = 0

  constructor(private product: ProductsService) {}

  ngOnInit(){
    this.product.getCategory().subscribe((categoryList)=>{
      if(categoryList){
        this.categories = categoryList
      }
    })
    if(localStorage.getItem('seller')){
      let sellerStore = localStorage.getItem('seller');
      let sellerData = sellerStore && JSON.parse(sellerStore)[0];
      this.sellerId = sellerData.id;
    }    
  }

  saveProduct(data: Product) {
    if(this.sellerId !== 0){
      data.sellerId = this.sellerId;
    }
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductSuccess = "Product Add Successfully!"
      } else {
        this.addProductError = "Somethibg Went Wrong. Please Try Again!"
      }
      setTimeout(() => { this.addProductSuccess = undefined; this.addProductError = undefined }, 3000)
    });
  }

}
