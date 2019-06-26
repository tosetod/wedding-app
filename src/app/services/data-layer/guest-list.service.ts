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

  createGuest(guest: { name: string}){
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('guests')
        .add(guest)
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
  
}