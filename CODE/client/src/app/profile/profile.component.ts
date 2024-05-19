import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { User } from '../types/food.types';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  providers : [UserService],
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profile : User | null = null
  constructor(private cookieService : CookieService, private userService : UserService){
    const cookie = this.cookieService.get('token');
    // if(cookie) this.profile = JSON.parse(cookie)
    this.userService.verifyUser(cookie.replace(/^"(.*)"$/, '$1')).subscribe(
      (res) => {
        this.profile = res.user.user
        console.log(this.profile);   
      },
      (err) => {
        console.log(err);
        
      }
    )
  }


}
