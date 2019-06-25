import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Guest } from 'src/app/models/guest.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestListService {
  private _db = firebase.firestore();
  private _guests: BehaviorSubject<Guest[]>; 
  
  constructor() {
    this._guests = <BehaviorSubject<Guest[]>>new BehaviorSubject([]);
   }

  createGuest(guest: { name: string}){
    this._db.collection('guests').add(guest);
  }

  get guests(){
      return this._guests.asObservable();
  }

  getAll() {
      let guests = [];
      this._db.collection('guests').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data({ serverTimestamps: 'estimate' }));
          guests.push(doc.data({ serverTimestamps: 'estimate' }));
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
      this._guests.next(Object.assign({}, guests));
  }
  
  
}