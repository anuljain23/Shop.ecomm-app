import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  //Router service to check the url of the current page
  //(in header because it will render in the complete website)
  constructor(private route:Router){}
  
  menuType:string = 'default';
  sellerFirstName:string = '';
  sellerLastName:string = '';

  ngOnInit(){
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          this.menuType = 'seller';
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerFirstName = sellerData.firstName;
            this.sellerLastName = sellerData.lastName;
          }       
        }else{
          this.menuType = 'default';
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate([''])
  }

}
