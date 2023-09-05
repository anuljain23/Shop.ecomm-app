import { EventEmitter, Injectable } from '@angular/core';
import { Product, category } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productAPIUrl: string = 'http://localhost:3000/products';
  categoryAPIUrl: string = 'http://localhost:3000/category';
  cartData = new EventEmitter<Product[] | []>()

  //Instance of HttpClient
  constructor(private http:HttpClient) { }

  getCategory(){
    return this.http.get<category[]>(this.categoryAPIUrl);
  }

  addProduct(data:Product){
    return this.http.post(this.productAPIUrl,data);    
  }

  allProductList(){
    return this.http.get<Product[]>(this.productAPIUrl)
  }

  allProductBySeller(sellerId:number){
    return this.http.get<Product[]>(this.productAPIUrl+`?sellerId=${sellerId}`)
  }

  getProduct(id:string){
    return this.http.get<Product>(this.productAPIUrl+'/'+id)
  }

  deleteProduct(id:number){
    return this.http.delete(this.productAPIUrl+'/'+id)
  }

  updateProduct(product:Product){
    return this.http.put(this.productAPIUrl+'/'+product.id,product);
  }

  popularProducts(){
    return this.http.get<Product[]>(this.productAPIUrl+'?_limit=3')
  }

  bestSellerProducts(){
    return this.http.get<Product[]>(this.productAPIUrl+'?_limit=8')
  }

  searchProduct(query:string){
    return this.http.get<Product[]>(this.productAPIUrl+`?q=${query}`)
  }

  addToLocalCart(data:Product){
    let cartData = []
    let locaCart = localStorage.getItem('localCart')
    if(locaCart){
      cartData = JSON.parse(locaCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }else{
      localStorage.setItem('localCart',JSON.stringify([data]))
    }
    this.cartData.emit(cartData)
  }

}
