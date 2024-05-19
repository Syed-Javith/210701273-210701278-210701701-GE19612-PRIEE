import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, RegisterUser, User } from '../types/food.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  
  loginUser(data : LoginUser) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/auth/login',data)
  }

  registerUser(data : RegisterUser ) : Observable<any>{
    return this.http.post<any>('http://localhost:8000/auth/register',data)
  }

  getUser(id : String ) : Observable<User>{
    return this.http.get<User>('http://localhost:8000/auth/user/'+id)
  }
  verifyUser(token : String) : Observable<any> {
    return this.http.get<any>('http://localhost:8000/auth/verify/'+token)
  }
}
