import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  private db = firebase.firestore();

  constructor() { }

  createUser(user: {}){
    this.db.collection('users').add(user);
  }
  
  
}
