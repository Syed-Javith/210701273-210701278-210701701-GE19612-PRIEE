import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoginUser, RegisterUser } from '../types/food.types';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private userService: UserService, private cookies 
    : CookieService , private router : Router) { }

  showLoginForm: boolean = true;
  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  onSubmit(formData: NgForm) {
    const email = formData.controls['email'].value;
    const password = formData.controls['password'].value
    if (this.showLoginForm) {
      const data: LoginUser = { email, password }
      this.userService.loginUser(data).subscribe((res) => {
        console.log(res);
        this.cookies.set('token', JSON.stringify(res.token) , new Date( Date.now() + (1000 * 60 * 60 * 24)) , '/' )
        this.router.navigate(['/foods'])
      },
        (err) => {
          console.log(err);
        })
    } else {
      const username = formData.controls['username'].value;
      const role = formData.controls['role'].value;
      const mobileNumber = formData.controls['mobileNumber'].value;
      const pincode = formData.controls['pincode'].value;
      const data: RegisterUser = { email, username, password, role, mobileNumber, pincode }
      console.log(data);
      this.userService.registerUser(data).subscribe((res) => {
        console.log(res);
        if(res) this.showLoginForm = true
      },
        (err) => {
          console.log(err);
        })

    }
  }
}
