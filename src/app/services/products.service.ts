import { Injectable } from '@angular/core';
import { Product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productAPIUrl: string = 'http://localhost:3000/products';

  //Instance of HttpClient
  constructor(private http:HttpClient) { }

  addProduct(data:Product){
    return this.http.post(this.productAPIUrl,data);    
  }

  allProductList(){
    return this.http.get<Product[]>(this.productAPIUrl)
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

}
