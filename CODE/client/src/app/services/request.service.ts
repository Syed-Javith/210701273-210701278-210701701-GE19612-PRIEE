import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Request } from '../types/food.types';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http : HttpClient) { }

  getRequests() : Observable<Request[]> {
    return this.http.get<Request[]>('http://localhost:8000/request')
  } 
  VolunteerTakeRequest(data : any) : Observable<any>{
    return this.http.patch<any>('http://localhost:8000/request',data)
  }
  VolunteerEnterToken(data : any) : Observable<any> {
    return this.http.put<any>('http://localhost:8000/request',data)
  }
  makeRequestForFood(data : any) : Observable<any> {
    return this.http.post<any>( 'http://localhost:8000/request' , data)
  }
}
