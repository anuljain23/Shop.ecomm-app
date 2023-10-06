import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { SellerAuthComponent } from './MyComponents/seller-auth/seller-auth.component';
// import { SellerHomeComponent } from './Seller/seller-home/seller-home.component';
import { authenticateSellerGuard } from './authenticate-seller.guard';
import { SellerProductsComponent } from './Seller/seller-products/seller-products.component';
import { SellerAddProductComponent } from './Seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './Seller/seller-update-product/seller-update-product.component';
import { SearchComponent } from './MyComponents/search/search.component';
import { DetailsComponent } from './MyComponents/details/details.component';
import { UserAuthComponent } from './MyComponents/user-auth/user-auth.component';
import { CartPageComponent } from './MyComponents/cart-page/cart-page.component';
import { CheckoutComponent } from './MyComponents/checkout/checkout.component';
import { MyOrdersComponent } from './MyComponents/my-orders/my-orders.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"seller-auth",component:SellerAuthComponent},
  // {path:"seller-home",component:SellerHomeComponent,canActivate:[authenticateSellerGuard]}
  {path:"seller-product",component:SellerProductsComponent,canActivate:[authenticateSellerGuard]},
  {path:"seller-add-product",component:SellerAddProductComponent,canActivate:[authenticateSellerGuard]},
  {path:"seller-update-product/:id",component:SellerUpdateProductComponent,canActivate:[authenticateSellerGuard]},
  {path:"search/:query",component:SearchComponent},
  {path:"details/:id",component:DetailsComponent},
  {path:"user-auth",component:UserAuthComponent},
  {path:"cart-page",component:CartPageComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"my-orders",component:MyOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
