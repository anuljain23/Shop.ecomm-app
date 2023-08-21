import { Component } from '@angular/core';
import { category } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category-gallery',
  templateUrl: './category-gallery.component.html',
  styleUrls: ['./category-gallery.component.css']
})
export class CategoryGalleryComponent {
  
  categoryList:undefined|category[]
  constructor(private product:ProductsService){}

  ngOnInit(){
    this.product.getCategory().subscribe((data)=>{
      if(data){
        this.categoryList = data
      }
    })
  }

}
