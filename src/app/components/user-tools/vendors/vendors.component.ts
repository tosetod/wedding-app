import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';
import { Restaurant } from 'src/app/models/restaurant.model';
import { VendorService } from 'src/app/services/data-layer/vendors.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  doc: Node[];// document.createElement("html");
  telRegex = "[0-9]*$";

  restaurants: Promise<any>;


  constructor (private vendorService: VendorService) { }

  // restaurantDataMapper(tels: string[], logos: string[], companyNames: string[], details: string[], websites: string[], facebooks: string[], directions: string[]){
  //   for (const tel of tels) {
  //     let rest = new Restaurant();
  //     rest.tel = tel;
  //     this.restaurants.push(rest);
  //   }
  //   const restaurant = new Restaurant();
  //   for (let i = 0; i < array.length; i++) {
  //     restaurant[key] = array.shift();


  //   }


  //   restaurant.tel = array.shift()
  //   //const values = [[this.tels], [this.logos], [this.companyNames], [this.details], [this.websites], [this.facebooks], [this.directions]];

  //   let values = {
  //     tels: this.tels,
  //     logos: this.logos,
  //     companyNames: this.companyNames
  //   }
  //console.log(Object.keys({values}).pop() === "values");
  //   for (const val of values.tels) {

  //       this.restaurants.push({
  //         tel: val,
  //         logo:val,
  //         companyName:val,
  //         detail: val,
  //         website: val,
  //         facebook: val,
  //         direction: val
  //       })

  //   }
  // }



  // async getData() {
  //   const proxyUrl = "https://serene-badlands-37247.herokuapp.com/";
  //   const targetUrl = "https://zk.mk/restorani-za-svadbi";
  //   const promise = await fetch(proxyUrl + targetUrl);
  //   const data = await promise.text();
  //   this.doc = jQuery.parseHTML(data);

  //   let tels: string[] = [];
  //   let logos: string[] = [];
  //   let companyNames: string[] = [];
  //   let details: string[] = [];
  //   let websites: string[] = [];
  //   let facebooks: string[] = [];
  //   let directions: string[] = [];
  //   let restaurants: Restaurant[] = [];
  //   $(".tcall", this.doc).each((index, value) => {
  //     //restaurant.tel = value.getAttribute("href").match(this.telRegex).toString();
  //     // this.restaurants[index].tel = value.getAttribute("href").match(this.telRegex).toString();
  //     //this.restaurants.push(restaurant);
  //     if (index % 2 === 0) {
  //       let r = new Restaurant();
  //       r.tel = value.getAttribute("href").match(this.telRegex).toString()
  //       this.restaurants.push(r);
  //     }

  //     //tels.push(value.getAttribute("href").match(this.telRegex).toString());
  //   });

  //   //console.log(tels);
  //   $("img.logo", this.doc).each((index, value) => {
  //     this.restaurants[index].logo = value.getAttribute("src");
  //     // this.restaurants[index].logo = value.getAttribute("src");
  //     //logos.push(value.getAttribute("src"));

  //   });
  //   console.log(this.restaurants);
  //   //console.log(logos);
  //   $("a.companyname", this.doc).each((index, value) => {
  //     this.restaurants[index].companyName = value.innerText;
  //     // companyNames.push(value.innerText);

  //   });
  //   //console.log(companyNames);
  //   $(".shortdescription.sprow>p", this.doc).each((index, value) => {
  //     this.restaurants[index].moreDetails = value.innerText;
  //     // details.push(value.innerText);
  //   });
  //   $(".shortdescription:nth-child(odd)", this.doc).each((index, value) => {
  //     this.restaurants[index].details = value.innerText;
  //     // details.push(value.innerText);
  //   });
  //   // console.log(details);
  //   $("a.website", this.doc).each((index, value) => {
  //     this.restaurants[index].website = value.getAttribute("href");
  //     // websites.push(value.getAttribute("href"));
  //   });
  //   //console.log(websites);
  //   $("a.facebook", this.doc).each((index, value) => {
  //     this.restaurants[index].facebook = value.getAttribute("href");
  //     // facebooks.push(value.getAttribute("href"));
  //   });
  //   //console.log(facebooks);
  //   $("a.directions", this.doc).each((index, value) => {
  //     let dir = value.getAttribute("href");
  //     dir = dir.replace(dir.substring(dir.indexOf("=") + 1, dir.indexOf("&")), "skopje");
  //     this.restaurants[index].directions = dir;

  //     // directions.push(value.getAttribute("href"));
  //   });
  //   //console.log(directions); 

  //   // for (const rest of this.restaurants) {
  //   //       if (!rest.tel.startsWith("0")) {
  //   //         rest.tel.concat("0", rest.tel);
  //   //         console.log(rest.tel)
  //   //       }
  //   //     }
  //   console.log(this.restaurants);
  // }




  ngOnInit() {
    this.restaurants = this.vendorService.getData();
      
    //this.mapData();
  }


}
