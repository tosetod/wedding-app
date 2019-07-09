import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class VendorService {



  constructor() { }

  async getData() {
    let doc: Node[];
    let restaurants: Restaurant[] = [];
    const telRegex = "[0-9]*$";
    const proxyUrl = "https://serene-badlands-37247.herokuapp.com/";
    const targetUrl = "https://zk.mk/restorani-za-svadbi";

    const promise = await fetch(proxyUrl + targetUrl);
    const data = await promise.text();

    doc = jQuery.parseHTML(data);

    $(".tcall", doc).each((index, value) => {
      if (index % 2 === 0) {
        let r = new Restaurant();
        r.tel = value.getAttribute("href").match(telRegex).toString()
        restaurants.push(r);
      }
    });
    $("img.logo", doc).each((index, value) => {
      restaurants[index].logo = value.getAttribute("src");

    });
    $("a.companyname", doc).each((index, value) => {
      restaurants[index].companyName = value.innerText;

    });
    $(".shortdescription.sprow>p", doc).each((index, value) => {
      restaurants[index].moreDetails = value.innerText;
    });
    $(".shortdescription:nth-child(odd)", doc).each((index, value) => {
      restaurants[index].details = value.innerText;
    });
    $("a.website", doc).each((index, value) => {
      restaurants[index].website = value.getAttribute("href");
    });
    $("a.facebook", doc).each((index, value) => {
      restaurants[index].facebook = value.getAttribute("href");
    });
    $("a.directions", doc).each((index, value) => {
      let dir = value.getAttribute("href");
      dir = dir.replace(dir.substring(dir.indexOf("=") + 1, dir.indexOf("&")), "skopje");
      restaurants[index].directions = dir;

    });
    for (const rest of restaurants) {
      if (!rest.tel.startsWith("0")) {
        rest.tel = "0" + rest.tel;
      }
    }
    return restaurants;
  }


}