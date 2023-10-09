import { Component } from '@angular/core';
import { orders } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderItems = 0
  myOrders:orders[]|undefined

  constructor(private product:ProductsService){}

  ngOnInit() {
    this.getOrderList()
  }

  calncelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList()
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.myOrders=result
      this.orderItems = result.length
    })
  }

}
