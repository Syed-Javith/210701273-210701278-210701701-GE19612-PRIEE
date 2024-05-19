import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User } from './types/food.types';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet , FormsModule , ReactiveFormsModule , HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [UserService]
})
export class AppComponent {
  title = 'Food App';
  currentUser : User | null = null
  constructor(private cookieService : CookieService, private userService : UserService){
    const cookie = this.cookieService.get('token');
    // if(cookie) this.currentUser = JSON.parse(cookie)
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
}
