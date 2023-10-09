import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product, category, orders } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productAPIUrl: string = 'http://localhost:3000/products';
  categoryAPIUrl: string = 'http://localhost:3000/category';
  cartAPIUrl: string = 'http://localhost:3000/cart';
  ordersAPIUrl: string = 'http://localhost:3000/orders';
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
      this.cartData.emit(cartData)
    }else{
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartData.emit([data])
    }
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      let cartItems:Product[] = JSON.parse(cartData)
      cartItems = cartItems.filter((item:Product)=>productId !== item.id)
      if(cartItems.length){
        localStorage.setItem('localCart',JSON.stringify(cartItems))
      }else{
        localStorage.removeItem('localCart')
      }
      this.cartData.emit(cartItems)
    }
  }

  addToCart(cartData:Cart){
    return this.http.post(this.cartAPIUrl,cartData);    
  }

  getCartList(userId:number){
    return this.http.get<Product[]>(this.cartAPIUrl+"?userId="+userId,
      {observe:'response'}).subscribe((result)=>{
        if(result && result.body){     
          this.cartData.emit(result.body)
        }
      })
  }

  removeFromCartRemote(cartId:number){
    return this.http.delete(this.cartAPIUrl+"/"+cartId);    
  }

  currentCart(){    
    let userSotre = localStorage.getItem('user');
    let userData = userSotre && JSON.parse(userSotre);
    return this.http.get<Cart[]>(this.cartAPIUrl+`?userId=${userData.id}`)
  }

  orderNow(data:orders){
    return this.http.post(this.ordersAPIUrl,data);    
  }

  orderList(){
    let userSotre = localStorage.getItem('user');
    let userData = userSotre && JSON.parse(userSotre);
    return this.http.get<orders[]>(this.ordersAPIUrl+`?userId=${userData.id}`)
  }

  cancelOrder(orderId:number){
    return this.http.delete(this.ordersAPIUrl+"/"+orderId)
  }

}
