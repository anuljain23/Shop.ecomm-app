import { Component } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductSuccess: string | undefined
  addProductError: string | undefined
  
  constructor(private product: ProductsService) {}

  saveProduct(data: Product) {
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
