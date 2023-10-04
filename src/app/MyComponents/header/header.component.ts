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
  userName:string = '';
  searchedProduct:undefined|Product[];
  cartItems = 0

  ngOnInit(){
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerFirstName = sellerData.firstName;
          this.sellerLastName = sellerData.lastName;
        }
        else if(localStorage.getItem('user')){
          this.menuType = 'user';
          let userSotre = localStorage.getItem('user')
          let userData = userSotre && JSON.parse(userSotre);
          this.userName = userData.userFirstName+' '+userData.userLastName;
          this.product.getCartList(userData.id)
        }
        else{
          this.menuType = 'default';
        }
      }
    })

    // get count of local cart on initialization
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }

    // update cartItems everytime when we add product to cart
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
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

  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }

}
