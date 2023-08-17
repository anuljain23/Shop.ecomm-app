import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './MyComponents/header/header.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { SellerAuthComponent } from './MyComponents/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { WebsiteComponent } from './MyComponents/website/website.component';
import { HttpClientModule } from '@angular/common/http';
// import { SellerHomeComponent } from './Seller/seller-home/seller-home.component';
import { SellerAddProductComponent } from './Seller/seller-add-product/seller-add-product.component';
import { SellerProductsComponent } from './Seller/seller-products/seller-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    WebsiteComponent,
    // SellerHomeComponent,
    SellerAddProductComponent,
    SellerProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
