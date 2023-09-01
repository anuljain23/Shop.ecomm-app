import { Component } from '@angular/core';
import { UserSignUp } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin = true;

  constructor(private user:UserService){}

  ngOnInit(){
    this.user.reloadUser()
  }

  toggleForm(){
    this.showLogin = !this.showLogin
  }

  createUserAccount(data:UserSignUp){
      this.user.addUser(data)
  }

}
