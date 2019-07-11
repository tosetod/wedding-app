import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { UserService } from 'src/app/services/data-layer/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription, Observable } from 'rxjs';
import { VendorService } from 'src/app/services/data-layer/vendors.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit,AfterContentInit, OnDestroy {
  
  subscription: Subscription;
  user: User;
  restaurants: Observable<any[]>;
  
  constructor(private userService: UserService, private vendorsService: VendorService) { }

  ngOnInit() { 
    this.restaurants = this.vendorsService.getRestaurantsValueChanges();
    this.restaurants = this.vendorsService.getRestaurantsData().pipe(map(restaurants => restaurants));  
  }

  ngAfterContentInit(): void {
    this.subscription = this.userService.user.subscribe(
      user => this.user = user
    ); 
    this.userService.getUser();
    const date: number  = new Date(this.user.wedDate).getMilliseconds()
    console.log(date);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRemove(rest){
    this.vendorsService.deleteRestaurant(rest);
  }
}
