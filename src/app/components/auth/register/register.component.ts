import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
  }

  onRegister (form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const age = form.value.age;
    const wedDate = form.value.wedDate;
    const partName = form.value.partnerName;
    const partAge = form.value.partnerAge;
    if (password === confirmPassword) {
      this.authService.registerUser(email, password);
    }
  }
}
