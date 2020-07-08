import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/data-layer/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  errMessage: string;

  constructor (private authService: AuthService, private userService: UserService) { }
  
  ngOnInit() {
    this.subscription = this.authService.errMessage.subscribe(
      message => this.errMessage = message
    );
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    const user = {
      //id: this.userService.generateId(),
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      age: form.value.age,
      wedDate: form.value.wedDate,
      partName: form.value.partnerName,
      partAge: form.value.partnerAge
    }
    if (password === confirmPassword) {
      this.authService.registerUser(user)
      form.reset();
    }
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
