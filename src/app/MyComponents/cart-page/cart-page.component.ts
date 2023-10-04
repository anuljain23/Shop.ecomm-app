import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {

  cartItems = 0;

  constructor(private product:ProductsService){}

  ngOnInit() {

    if(localStorage.getItem('user')) {
      let userSotre = localStorage.getItem('user');
      let userData = userSotre && JSON.parse(userSotre);
      this.product.getCartList(userData.id);
    }

    // get count of local cart on initialization
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    // update cartItems everytime when we add product to cart
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }
}
