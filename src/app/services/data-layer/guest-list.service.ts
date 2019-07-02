import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Guest } from 'src/app/models/guest.model';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class GuestListService {

  guestsChanged = [];

  constructor(private firestore: AngularFirestore) { 
  }

  createGuest(guest: Guest){
    const newGuest = {
      name: guest.name,
      isInvited: false,
      confirmed: false,
      plusOne: {
        name: ''
      }
    }
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('guests')
        .add(newGuest)
        .then(res => {}, err => reject(err));
    })
  }

  getGuestsData(){
    return this.firestore.collection('guests').snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Guest;
          const id = a.payload.doc.id;
          return { id, ...data};
        })
      }
    ));
  }

  

  getGuestsValueChanges(){
    return this.firestore
            .collection('guests').valueChanges();
  }

  deleteGuest(guest: Guest){
    return new Promise<any>((res, rej) => {
      this.firestore.collection('guests').doc(guest.id).delete()
        .then(res => {}, err => rej(err));
    })
  }

  guestPlusOne(guest: Guest){
    return new Promise<any>((res, rej) => {
      this.firestore.collection('guests').doc(guest.id).update({'plusOne.name': guest.name + "'s plus one"})
        .then(res => {}, err => rej(err));
    })
  }

  confirmGuest(guest: Guest){
    return new Promise<any>((res, rej) => {
      this.firestore.collection('guests').doc(guest.id).update({'confirmed': true})
        .then(res => {}, err => rej(err));
    })
  }

  inviteGuest(guest:Guest){
    return new Promise<any>((res, rej) => {
      this.firestore.collection('guests').doc(guest.id).update({'isInvited': true})
        .then(res => {}, err => rej(err));
    })
  }

  removePlusOne(guest: Guest){
    return new Promise<any>((res, rej) => {
      this.firestore.collection('guests').doc(guest.id).update({'plusOne.name': ''})
        .then(res => {}, err => rej(err));
    })
  }


  
}