import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new Subject<User>();

  constructor(private firestore: AngularFirestore) { }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  createUser(user: User){
    this.firestore.collection('users').add(user);
  }
  
  getUser(){
    const userEmail = firebase.auth().currentUser.email;
    const userRef = firebase.firestore().collection('users');
    const query = userRef.where('email', '==', userEmail);
    query.get({source: 'server'}).then(querySnapshot => {
              querySnapshot.docs.map(doc => {
                const user = doc.data() as User;
                this.user.next(user);
              })
          });
  }
  
}
