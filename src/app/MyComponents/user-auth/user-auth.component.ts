import { Component } from '@angular/core';
import { UserSignIn, UserSignUp } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin = true;
  errorMessage:string|undefined

  constructor(private user:UserService){}

  ngOnInit(){
    this.user.reloadUser()
  }

  toggleForm(){
    this.showLogin = !this.showLogin
  }

  createUserAccount(data:UserSignUp){
      this.user.addUser(data);
  }

  signInUser(formData:UserSignIn){
    this.user.userSignIn(formData)
    this.user.invalidUser.subscribe((result)=>{
      if(result){
        this.errorMessage = "Please Eneter Valid Email And Password"
      }
    })
  }

}
