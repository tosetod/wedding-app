import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  errMessage:string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.errMessage.subscribe(
      (message: string) => this.errMessage = message
    )
    
  }

  onSignIn(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
