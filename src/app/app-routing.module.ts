import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { SellerAuthComponent } from './MyComponents/seller-auth/seller-auth.component';
// import { SellerHomeComponent } from './Seller/seller-home/seller-home.component';
import { authenticateSellerGuard } from './authenticate-seller.guard';
import { SellerProductsComponent } from './Seller/seller-products/seller-products.component';
import { SellerAddProductComponent } from './Seller/seller-add-product/seller-add-product.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"seller-auth",component:SellerAuthComponent},
  // {path:"seller-home",component:SellerHomeComponent,canActivate:[authenticateSellerGuard]}
  {path:"seller-product",component:SellerProductsComponent,canActivate:[authenticateSellerGuard]},
  {path:"seller-add-product",component:SellerAddProductComponent,canActivate:[authenticateSellerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
