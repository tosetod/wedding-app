import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GuestListService } from 'src/app/services/data-layer/guest-list.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  guests: Observable<any[]>;
  isInvited: boolean;
  guestsNumber: number = 0;
  @Output() messageEvent = new EventEmitter<number>();

  constructor(private guestService: GuestListService) { }

  ngOnInit() {
    this.guests = this.guestService.getGuestsValueChanges();
    this.guests = this.guestService.getGuestsData().pipe(map(guests => {
      guests.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.guestsNumber = guests.length;
      this.messageEvent.emit(guests.length);
      for (const guest of guests) {
        if (guest.plusOne.name !== '') {
          this.guestsNumber++;
        }
      }
      return guests;
    }));
  }


  onSearch(value){
    this.guests = this.guestService.getGuestsData()
      .pipe(map(guests => {
        guests.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        this.guestsNumber = guests.length;
        for (const guest of guests) {
          if (guest.plusOne.name !== '') {
            this.guestsNumber++;
          }
        }
        return guests.filter(guest => guest.name.toLowerCase().includes(value.toLowerCase()));
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

  onPlusOne(guest){
    this.guestService.guestPlusOne(guest)
    .then(res => {
    })
  }

  onInvite(guest){
    this.guestService.inviteGuest(guest);
  }

  onConfirm(guest){
    this.guestService.confirmGuest(guest);
  }

  onDelete(guest){
    this.guestService.deleteGuest(guest);
  }

  onRemovePlusOne(guest){
    this.guestService.removePlusOne(guest);
  }
  
  
}
