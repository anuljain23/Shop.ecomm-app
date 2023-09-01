import { Component } from '@angular/core';
import { category } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  categories:undefined|category[]
  constructor(private product:ProductsService){}

  ngOnInit(){
    this.product.getCategory().subscribe((data)=>{
      if(data){
        this.categories = data
        this.categories.length = 4;
      }
    })
  }

}
