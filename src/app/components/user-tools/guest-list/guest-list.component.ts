import { Component, OnInit } from '@angular/core';
import { GuestListService } from 'src/app/services/data-layer/guest-list.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  guests: Observable<any[]>;
  isInvited: boolean;

  constructor(private guestService: GuestListService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.guests = this.guestService.getGuestsValueChanges();
    this.guests = this.guestService.getGuestsData().pipe(map(guests => {
      guests.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
      return guests;
    }));
  }

  onAddGuest(name){
    const guest = {
      name: name.value
    }
    name.value = '';
    if (guest.name !== '') {
      this.guestService.createGuest(guest)
      .then(res => {
        console.log(res);
      })
    }
    
      
  }

  onPlusOne(plusGuest){
    const guest = {
      name: `${plusGuest.name}'s plus one` 
    }
    this.guestService.createGuest(guest)
    .then(res => {
      console.log(res);
    })
  }

  onInvite(guest){
    this.isInvited = !this.isInvited;
    console.log(guest);
  }

  

  
}
