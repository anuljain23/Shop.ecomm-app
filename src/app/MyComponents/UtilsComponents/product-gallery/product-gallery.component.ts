import { Component } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent {

  bestSellerProductList:undefined|Product[]
  constructor(private product:ProductsService){}

  ngOnInit(){
    this.product.bestSellerProducts().subscribe((data)=>{
      if(data){
        this.bestSellerProductList = data
      }
    })
  }

}
