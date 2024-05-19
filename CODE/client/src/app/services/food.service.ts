import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AddFood, Food } from '../types/food.types';
interface LocationData {
  latitude: number;
  longitude: number;
  // Add other properties if present in the response
}
@Injectable({
  providedIn: 'root'
})

export class FoodService {

  constructor(private http : HttpClient) { }
  getFoods(lat :number ,long:number) : Observable<Food[]> {
    console.log(lat,long);
    
    return this.http.get<Food[]>(`http://localhost:8000/food/${lat}/${long}`);
  }
  getFood(id : String) : Observable<Food> {
    return this.http.get<Food>('http://localhost:8000/food/'+id);
  }
  addFood(data : AddFood) : Observable<Food> {
    return this.http.post<Food>('http://localhost:8000/food',data)
  }
  getFoodByVolunteer(data : any) : Observable<any>{
    return this.http.delete('http://localhost:8000/food/'+ data)
  }
  getLocation(): Observable<{ latitude: number, longitude: number }> {
    return this.http.get<any>('https://ipapi.co/json').pipe(
      map((data: { latitude: any; longitude: any; }) => ({
        latitude: data.latitude || 0,
        longitude: data.longitude || 0
      })))
      // catchError();
  }
}
