import { Component, OnInit } from '@angular/core';
import { GuestListService } from 'src/app/services/data-layer/guest-list.service';
import { Guest } from 'src/app/models/guest.model';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  
  public guests: Guest[];

  constructor(private guestService: GuestListService) { }

  ngOnInit() {
    this.guests = this.guestService.guests.subscribe(n => n.);
  }


  onAddGuest(name){
    const guest = {
      name: name.value
    }
    this.guestService.createGuest(guest);
    console.log('guest ' + guest.name + ' created');
    name.value = '';
    
    console.log(this.guests);
  }

}
