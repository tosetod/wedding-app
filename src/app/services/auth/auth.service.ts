import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  errMessage: string;
  emailSent: boolean;
  constructor(private router: Router){  }

  registerUser(email: string, password: string): boolean{
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.sendEmailVerification()
        .then(() => {
            this.emailSent = true;
            return true;
          //this.router.navigate(['']);
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        this.errMessage = err.message
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
      .catch(error => console.log(error));
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
