import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  errMessage = new Subject<string>();
  emailSent: boolean;

  constructor(private router: Router){  }

  registerUser(email: string, password: string): boolean{
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.sendEmailVerification()
        .then(() => {
            this.emailSent = true;
            return true;
        })
        .catch(err => {
          this.errMessage.next(err);
        });
      })
      .catch(err => {
        this.errMessage.next(err);
        return false;
      });
      return true;
  }
  
  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => {
          if(res.user.emailVerified){
            this.router.navigate(['panel']);
            firebase.auth().currentUser.getIdToken()
              .then(
                (token: string) => this.token = token
              )
          }
        })
      .catch(error => {
        this.errMessage.next(error);
      });
  }


  logout(){
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }
}
