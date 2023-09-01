import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserSignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userAPIUrl: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private router:Router) {}

  addUser(data:UserSignUp){
    // { observe to check the response of the post request }
    return this.http.post(this.userAPIUrl,data,{observe:'response'}).subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  reloadUser(){
    if(localStorage.getItem('user')){
      this.router.navigate([''])
    }
  }

}
