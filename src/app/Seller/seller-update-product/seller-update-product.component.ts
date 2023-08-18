import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData:undefined|Product
  actionProductMessageSuccess:string|undefined
  actionProductMessageError:string|undefined

  constructor(private product:ProductsService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(){
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData = result;
    })
  }

  editProduct(data:Product){
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.actionProductMessageSuccess = "Product Updated Successfully!"
      }else{
        this.actionProductMessageError = "Something Went Wrong. Please Try Again!"
      }
    })
    setTimeout(()=>{
      if(this.actionProductMessageSuccess){
        this.actionProductMessageSuccess = undefined
        this.router.navigate(['seller-product'])
      }else if(this.actionProductMessageError){
        this.actionProductMessageError = undefined
      }
    },3000)
  }

}
