import { Component } from '@angular/core';
import { FoodService } from '../services/food.service';
import { AddFood, Food, User } from '../types/food.types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GeolocationService } from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [FoodService, UserService],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent {
  addFormVisible = false;
  isPending = false;
  currentUser: User | null = null;
  lat = 0; long = 0;
  toggleAddForm() {
    this.addFormVisible = !this.addFormVisible
  }
  foods: Food[] = [];
  constructor(private FoodService: FoodService, private cookieService: CookieService, private userService: UserService, private navigate : Router,private readonly geolocation$: GeolocationService) {
    this.isPending = true
    const cookie = this.cookieService.get('token')
    // if (cookie) this.currentUser = JSON.parse(cookie)
    geolocation$.subscribe(position =>  { 
      console.log(position.coords); 
      this.lat = position.coords.latitude; 
      this.long = position.coords.longitude 
      this.FoodService.getFoods(this.lat,this.long).subscribe(
        (res: Food[]) => {
          this.foods = res;
          console.log(this.foods);
          this.isPending = false
        }
        ,
        (err) => {
          console.log(err);
          this.isPending = false
        }) 
    } );
    console.log(this.lat,this.long);
    
    if(!cookie) this.navigate.navigate(['/']);
    this.userService.verifyUser(cookie.replace(/^"(.*)"$/, '$1')).subscribe(
      (res) => {
        this.currentUser = res.user.user
        console.log(this.currentUser);   
      },
      (err) => {
        console.log(err);
      }
    )
    
  }

  addFood(data: NgForm) {
    const addData: AddFood = {
      description: data.controls['description'].value, distributor: this.currentUser?.username + "", foods: data.controls['foods'].value, image: data.controls['image'].value, location: data.controls['pincode'].value,
      pincode: "" , coordinates : { lat : this.lat , long : this.long } , distributorId : this.currentUser?._id ?? ""
    }
    this.FoodService.addFood(addData).subscribe((res) => {
      console.log(res);
      this.addFormVisible = false
    },
      (err) => {
        console.log(err);

      })
  }

  logout(){
    this.cookieService.delete('token');
    this.navigate.navigate(['/'])
  }
}
