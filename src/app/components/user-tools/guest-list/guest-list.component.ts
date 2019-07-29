import { Component, OnInit } from '@angular/core';
import { GuestListService } from 'src/app/services/data-layer/guest-list.service';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Guest } from 'src/app/models/guest.model';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  guests: Observable<any[]>;
  isInvited: boolean;
  guestsNumber: number = 0;

  constructor(private guestService: GuestListService) { }

  ngOnInit() {
    this.guests = this.guestService.getGuestsData().pipe(map(guests => {
      guests.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.guestsNumber = guests.length;
      for (const guest of guests) {
        if (guest.plusOne !== '') {
          this.guestsNumber++;
        }
      }
      return guests;
    }));
  }


  onSearch(value: string){
    this.guests = this.guestService.getGuestsData()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(guests => {
        guests.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        this.guestsNumber = guests.length;
        for (const guest of guests) {
          if (guest.plusOne !== '') {
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
      this.guestService.createGuest(guest).subscribe();     
    }      
  }

  onUpdate(guest: Guest){
    this.guestService.updateGuest(guest).subscribe();
  }


  onDelete(guest){
    this.guestService.deleteGuest(guest).subscribe;
  }

  
  
}
