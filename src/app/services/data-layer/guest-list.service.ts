import { Injectable } from '@angular/core';
import { Guest } from 'src/app/models/guest.model';
import { map } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GuestListService {

  guestsUrl = 'http://localhost:8080/wedding/1/guests'

  constructor(private http: HttpClient) { 
  }

  createGuest(guest: Guest){
    return this.http.post<Guest>(this.guestsUrl, guest);
  }

  getGuestsData(){
    return this.http.get<Guest[]>(this.guestsUrl);
  }


  deleteGuest(guest: Guest){
    return this.http.delete<Guest>(this.guestsUrl, {params: new HttpParams().set('id', guest.id)});
  }

  updateGuest(guest: Guest){
    const editedGuest = {
      name: guest.name,
      isInvited: guest.isInvited,
      confirmed: guest.confirmed,
      plusOne: guest.plusOne
    }

    return this.http.put<Guest>(this.guestsUrl, editedGuest, {params: new HttpParams().set('id', guest.id)})
  }
  
}