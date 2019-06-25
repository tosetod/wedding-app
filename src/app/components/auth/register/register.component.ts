import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataLayerService } from 'src/app/services/data-layer/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private authService: AuthService, private dataLayer: DataLayerService) { }
  
  ngOnInit() {
  }

  onRegister (form: NgForm){
     const email = form.value.email;
     const password = form.value.password;
     const confirmPassword = form.value.confirmPassword;
    // const firstName = form.value.firstName;
    // const lastName = form.value.lastName;
    // const age = form.value.age;
    // const wedDate = form.value.wedDate;
    // const partName = form.value.partnerName;
    // const partAge = form.value.partnerAge;
    const user = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      age: form.value.age,
      wedDate: form.value.wedDate,
      partName: form.value.partnerName,
      partAge: form.value.partnerAge
    }
    if (password === confirmPassword) {
      if (this.authService.registerUser(email, password)) {
        this.dataLayer.createUser(user);
      }
    }
  }
}
