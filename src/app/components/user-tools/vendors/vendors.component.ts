import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  doc: Node[];// document.createElement("html");
  telRegex = "[0-9]*$"

  async getData(){
    const proxyUrl = "https://serene-badlands-37247.herokuapp.com/";
    const targetUrl = "https://zk.mk/restorani-za-svadbi";
    const promise = await fetch(proxyUrl + targetUrl);
    const data = await promise.text();
    
    //this.doc.innerHTML = data;
    this.doc = jQuery.parseHTML(data);
    //console.log(this.doc.getElementsByClassName("tcall")[0].textContent);
    let tels: string[] = [];
    $(".tcall", this.doc).each((index, value) => {
        tels.push(value.getAttribute("href"));
      });
    for (const tel of tels) {
      console.log(tel.match(this.telRegex)[0]);
    }
    //console.log(tels[0].match(this.telRegex));
    //console.log($(".tcall", this.doc).attr("href"))
   
    
  }

  constructor() { }

  ngOnInit() {
    this.getData();
  }


}
