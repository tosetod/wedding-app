import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = new Subject<string>();
  errMessage = new Subject<string>();
  emailSent: boolean;

  constructor(private router: Router, private http: HttpClient){  }

  registerUser(user: User){
    this.http.post<User>("http://localhost:49947/users/register", user).subscribe(
      () => {
        this.router.navigateByUrl('/signin');
      }
    );
  }
  
  signinUser(email: string, password: string){
    return this.http.post("http://localhost:49947/users/signin", {
        email: email,
        password: password
      }).subscribe(
        (user : User) => { 
          this.token.next(user.token);
            this.router.navigateByUrl('/panel');
        }
    );;
  }


  logout(){
    firebase.auth().signOut();
    //AuthService.token = "";
    this.router.navigate(['/']);
  }

  getToken() {
    // firebase.auth().currentUser.getIdToken()
    //   .then(
    //     (token: string) => AuthService.token = token
    //   );
    // return AuthService.token;
  }

  isAuthenticated(){
    return true;//(AuthService.token != "") || (AuthService.token != null);
  }
}
