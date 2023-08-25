import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  //Router service to check the url of the current page
  //(in header because it will render in the complete website)
  constructor(private route:Router,private product:ProductsService,private activeRoute:ActivatedRoute){}
  
  menuType:string = 'default';
  sellerFirstName:string = '';
  sellerLastName:string = '';
  searchedProduct:undefined|Product[]

  ngOnInit(){
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          this.menuType = 'seller';
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerFirstName = sellerData.firstName;
            this.sellerLastName = sellerData.lastName;
          }       
        }else{
          this.menuType = 'default';
        }
      }
    })
  }

  searchProduct(query:KeyboardEvent){
    const element  = query.target as HTMLInputElement
    if(element.value !== ""){
      this.product.searchProduct(element.value).subscribe((result)=>{
        if(result){
          if(result.length > 5){
            result.length = 5
          }
          this.searchedProduct = result
        }
      }) 
    }else{
      this.hideSearch()
    }
  }

  searchButton(val:string){
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

  hideSearch(){
    this.searchedProduct = undefined
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate([''])
  }

}
