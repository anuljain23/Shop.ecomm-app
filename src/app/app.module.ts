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
import { SellerAddProductComponent } from './Seller/seller-add-product/seller-add-product.component';
import { SellerProductsComponent } from './Seller/seller-products/seller-products.component';
import { SellerUpdateProductComponent } from './Seller/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductGalleryComponent } from './MyComponents/UtilsComponents/product-gallery/product-gallery.component';
import { CategoryGalleryComponent } from './MyComponents/UtilsComponents/category-gallery/category-gallery.component';
import { SearchComponent } from './MyComponents/search/search.component';
import { DetailsComponent } from './MyComponents/details/details.component';
import { UserAuthComponent } from './MyComponents/user-auth/user-auth.component';
import { FooterComponent } from './MyComponents/footer/footer.component';
import { CartPageComponent } from './MyComponents/cart-page/cart-page.component';
import { CheckoutComponent } from './MyComponents/checkout/checkout.component';
import { MyOrdersComponent } from './MyComponents/my-orders/my-orders.component';
import { CategoryComponent } from './MyComponents/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    WebsiteComponent,
    SellerAddProductComponent,
    SellerProductsComponent,
    SellerUpdateProductComponent,
    ProductGalleryComponent,
    CategoryGalleryComponent,
    SearchComponent,
    DetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
