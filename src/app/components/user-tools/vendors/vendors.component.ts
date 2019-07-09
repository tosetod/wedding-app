import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/data-layer/vendors.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  restaurants: Promise<any>;

  constructor (private vendorService: VendorService) { }

  ngOnInit() {
    this.restaurants = this.vendorService.getData();
  }


}
