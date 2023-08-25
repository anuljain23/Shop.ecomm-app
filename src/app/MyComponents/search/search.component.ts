import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchedProducts:undefined|Product[]
  ResultFound:boolean = true
  constructor(private activeRoute:ActivatedRoute,private product:ProductsService){}

  ngOnInit(){
    let query = this.activeRoute.snapshot.paramMap.get('query')
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchedProducts = result
    })
    if(this.searchedProducts && this.searchedProducts?.length>0){
      this.ResultFound = true
    }else{
      this.ResultFound = false
    }
  }

}
