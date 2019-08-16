import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/data-layer/vendors.service';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  restaurants: Promise<any>;
  restaurantAdded: Restaurant;
  rests: Restaurant[] = [];

  constructor (private vendorService: VendorService) { }

  ngOnInit() {
    this.restaurants = this.vendorService.getData();
    this.vendorService.getData().then(r => {
      this.rests = r;
      console.log(this.rests);
      this.rests.forEach(element => {
        this.vendorService.createRestaurant(element).subscribe();
      });
    }
    );

  }

  onAdd(restaurant){
    this.vendorService.createRestaurant(restaurant);
    this.restaurantAdded = restaurant;
  }
}
