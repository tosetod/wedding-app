import { Component, OnInit, DoCheck } from '@angular/core';
import { GuestListService } from 'src/app/services/data-layer/guest-list.service';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Guest } from 'src/app/models/guest.model';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit, DoCheck {

  //guests: Observable<Guest[]>;
  guests: Guest[] = [];
  isInvited: boolean;
  guestsNumber: number = 0;

  constructor(private guestService: GuestListService) { }

  ngOnInit() {
    this.guestService.getGuestsData().pipe(map(guests => {
      this.guestsNumber = guests.length;
      for (const guest of guests) {
        if (guest.plusOne !== false) {
          this.guestsNumber++;
        }
      }
      return guests;
    })).subscribe(guests => {
      this.guests = guests;
    });

  }

  ngDoCheck(): void {
    this.guests.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.guestsNumber = this.guests.length;
    for (const guest of this.guests) {
      if (guest.plusOne !== false) {
        this.guestsNumber++;
      }
    }
  }

  onSearch(value: string){
    this.guestService.getGuestsData()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(guests => {
        this.guestsNumber = guests.length;
        for (const guest of guests) {
          if (guest.plusOne !== false) {
            this.guestsNumber++;
          }
        }
        return guests.filter(guest => guest.name.toLowerCase().includes(value.toLowerCase()));
    })).subscribe(guests => {
      this.guests = guests;
    });;
  }

  onAddGuest(name){
    const guest = {
      name: name.value
    }
    name.value = '';
    if (guest.name !== '') {
      this.guestService.createGuest(guest).subscribe(guest => {
        this.guests.push(guest);
      });
    }

  }

  onInvite(guest: Guest){
    guest.invited = true;
    const index = this.guests.findIndex(g => guest.id === g.id);
    this.guests.splice(index, 1, guest);
    this.guestService.updateGuest(guest).subscribe();
  }

  onConfirm(guest: Guest){
    const editedGuest = {
      id: guest.id,
      name: guest.name,
      invited: true,
      confirmed: true,
      plusOne: guest.plusOne
    }
    const index = this.guests.findIndex(g => guest.id === g.id);
    this.guests.splice(index, 1, editedGuest);
    console.log(editedGuest);
    console.log(this.guests);
    this.guestService.updateGuest(editedGuest).subscribe();
  }

  onPlusOne(guest: Guest){
    guest.plusOne = true;
    this.guestService.updateGuest(guest).subscribe();
  }

  onRemovePlusOne(guest: Guest){
    guest.plusOne = false;
    this.guestService.updateGuest(guest).subscribe();
  }

  onDelete(guest){
    this.guests.filter((g, index) => {
      if(guest.id === g.id){
        this.guests.splice(index, 1);
      }
    });
    this.guestService.deleteGuest(guest).subscribe();
  }



}
