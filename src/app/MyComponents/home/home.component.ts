import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  popularProductList:undefined|Product[]
  constructor(private product:ProductsService){}

  ngOnInit(){
    this.product.popularProducts().subscribe((data)=>{
      if(data){
        this.popularProductList = data
      }
    })
  }

}
