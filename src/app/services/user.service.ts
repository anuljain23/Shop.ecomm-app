import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserSignIn, UserSignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userAPIUrl: string = 'http://localhost:3000/users';
  
  //BehaviorSubject changes its value whenever susbcribed
  isUserSignedIn = new BehaviorSubject<boolean>(false);
  
  //If Singin credentials are invalid emit error
  invalidUser = new EventEmitter<boolean>(true)
  
  constructor(private http: HttpClient, private router:Router) {}

  addUser(data:UserSignUp){
    // { observe to check the response of the post request }
    return this.http.post(this.userAPIUrl,data,{observe:'response'}).subscribe((result)=>{
      this.isUserSignedIn.next(true);
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/'])
    })
  }

  reloadUser(){
    if(localStorage.getItem('user')){
      this.isUserSignedIn.next(true);
      this.router.navigate([''])
    }
  }

  userSignIn(data: UserSignIn) {
    this.http
      .get<UserSignUp[]>(
        this.userAPIUrl + `?userEmail=${data.email}&userPassword=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if(result && result.body?.length){
          this.invalidUser.emit(false)
          localStorage.setItem('user',JSON.stringify(result.body[0]))
          this.router.navigate(['/'])
        }else{
          this.invalidUser.emit(true)
        }
      });
  }

}
