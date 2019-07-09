import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  doc: Node[];// document.createElement("html");
  telRegex = "[0-9]*$";

  tels: string[] = ["070311630", "070311630", "078305234", "078305234", "078225750", "078225750", "075204323", "075204323", "078305234", "078305234", "070372008", "070372008", "078225670", "078225670", "044333974", "044333974", "044346222", "044346222", "070371363", "070371363", "070329627", "070329627", "070717549", "070717549", "76466244", "76466244", "044394136", "044394136", "044521676", "044521676", "071290851", "071290851", "044378100", "044378100", "044346444", "044346444", "070256751", "070256751", "070263415", "070263415", "070389263", "070389263", "070809636", "070809636", "048800100", "048800100", "078229091", "078229091", "022670455", "022670455", "023092392", "023092392", "033361361", "033361361"];
  logos: string[] = ["//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1539329382_39.jpg?t=true&w=300&h=300", "//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1452867400_87.jpg?t=true&w=300&h=300", "//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1522752938_82.jpg?t=true&w=300&h=300", "//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1482391874_64.png?t=true&w=300&h=300", "//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1454935363_28.png?t=true&w=300&h=300", "//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1512119583_43.jpg?t=true&w=300&h=300", "//1050864291.rsc.cdn77.org/sites/zk/docs/trans{mk}logo_1522751368_0.png?t=true&w=300&h=300"];
  companyNames: string[] = ["Вединг Хаус", "Далма", "Дениција", "Ресторан Далиа", "Вила Ина", "Бон бон", "Везилка", "Арена", "Арра", "Ахенгу & Сопи", "Вотра", "Динамика", "Дураку", "Елита", "Контраст", "Лили", "Петрол-компани", "Пет Ѕвезди", "Саја", "Фонтана", "Хајбори", "Шота", "Алавантија", "Албис", "Александар", "Александар Палас", "Александар Парк"];
  details: string[] = ["Уникатен амбиент, импресивна местоположба, поволни цени..", "ресторани за свадби", "\"Бидете гостин на сопствената забава“- Далма Фоод & Кетеринг Сервис ", "кетеринг, ресторани за свадби, настани - организација", "Дениција е помалата сестра на Везилка, дизајнирана…еѓу најдобрите ресторани за свадби во Македонија.", "ресторани за свадби", "Ресторанот „Ханибал“ започна со работа уште во 199…за високиот квалитет во извршувањето на услугите.", "ресторани за свадби, кетеринг", "Доколку секогаш сте ја замислувале вашата венчавка…ослава на отворено, Вила Ина е она што го барате!", "ресторани за свадби", "Ресторант базен \"Бон Бон\"", "базени за пливање, ресторани - пицерии, ресторани за свадби", "Везилка е нов модерен ресторан за свадби, деловни …ана и сервирана за уникатно гурманско доживување.", "ресторани за свадби, кетеринг", "", "ресторани од а до ш, ресторани за свадби", "", "ресторани за свадби, кетеринг, ресторани од а до ш", "", "ресторани за свадби, ресторани од а до ш", "", "свадби - храна и пијалаци, ресторани за свадби, народни кујни, готвени јадења", "", "ресторани за свадби, хотели", "", "ресторани за свадби", "", "ресторани од а до ш, ресторани за свадби, ресторани - пицерии", "", "ресторани за свадби", "", "ресторани за свадби", "", "бензински пумпи, ресторани од а до ш, нафта и нафтени деривати, ресторани за свадби, хотели", "", "ресторани за свадби", "", "ресторани за свадби", "", "ресторани од а до ш, ресторани за свадби", "", "ресторани од а до ш, ресторани за свадби", "", "ресторани за свадби", "", "ресторани за свадби", "", "ресторани за свадби, ресторани од а до ш", "", "ресторани за свадби", "", "хотели, ресторани од а до ш, конференциски капацитети и услуги, ресторани за свадби", "", "хотели, ресторани за свадби, кафе-барови и кафе-клубови"];
  websites: string[] = ["http://www.weddinghouse.mk", "http://www.dalma.com.mk", "http://www.denicija.mk", "http://www.dalia.mk", "http://www.villaina.mk", "http://", "http://www.vezilka.com"];
  facebooks: string[] = ["http://www.facebook.com/weddinghouse2017/", "http://www.facebook.com/CateringServiceDalma/", "http://www.facebook.com/denicija.mk/", "http://www.facebook.com/129496287100347/", "http://www.facebook.com/vilaina", "http://www.facebook.com/restaurantbazenbonbon", "http://www.facebook.com/vezilka"];
  directions: string[] = ["https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=41.9319974264,21.5060766288", "https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=41.996831,21.416335", "https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=41.9669914335,21.4690624052", "https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=42.0023104039,21.5028083324", "https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=41.9814780821,21.3786971569", "https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=42.0483405502,21.4268642621", "https://maps.google.com/maps?saddr=41.1412010193,-73.2637023926&daddr=41.9674,21.469999"];
  restaurants: Restaurant[] = [];

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



  async getData(){
    const proxyUrl = "https://serene-badlands-37247.herokuapp.com/";
    const targetUrl = "https://zk.mk/restorani-za-svadbi";
    const promise = await fetch(proxyUrl + targetUrl);
    const data = await promise.text();
    this.doc = jQuery.parseHTML(data);
    
    let tels: string[] = [];
    let logos: string[] = [];
    let companyNames: string[] = [];
    let details: string[] = [];
    let websites: string[] = [];
    let facebooks: string[] = [];
    let directions: string[] = [];
    let restaurants: Restaurant[] = [];
    $(".tcall", this.doc).each((index, value) => {
        //restaurant.tel = value.getAttribute("href").match(this.telRegex).toString();
        // this.restaurants[index].tel = value.getAttribute("href").match(this.telRegex).toString();
        //this.restaurants.push(restaurant);
        if (index % 2 === 0) {
          let r = new Restaurant();
          r.tel = value.getAttribute("href").match(this.telRegex).toString()
          this.restaurants.push(r);
        }
        
        //tels.push(value.getAttribute("href").match(this.telRegex).toString());
      });
      
    //console.log(tels);
    $("img.logo", this.doc).each((index, value) => {
        this.restaurants[index].logo = value.getAttribute("src");
        // this.restaurants[index].logo = value.getAttribute("src");
        //logos.push(value.getAttribute("src"));
      
    });
    console.log(this.restaurants);
    //console.log(logos);
    $("a.companyname", this.doc).each((index, value) => {
      this.restaurants[index].companyName = value.innerText;
      // companyNames.push(value.innerText);

    });
    //console.log(companyNames);
    $(".shortdescription.sprow>p", this.doc).each((index, value) => {
      this.restaurants[index].moreDetails = value.innerText;
      // details.push(value.innerText);
    });
    $(".shortdescription:nth-child(odd)", this.doc).each((index, value) => {
      this.restaurants[index].details = value.innerText;
      // details.push(value.innerText);
    });
    // console.log(details);
    $("a.website", this.doc).each((index, value) => {
      this.restaurants[index].website = value.getAttribute("href");
      // websites.push(value.getAttribute("href"));
    });
    //console.log(websites);
    $("a.facebook", this.doc).each((index, value) => {
      this.restaurants[index].facebook = value.getAttribute("href");
      // facebooks.push(value.getAttribute("href"));
    });
    //console.log(facebooks);
    $("a.directions", this.doc).each((index, value) => {
      let dir = value.getAttribute("href");
      dir = dir.replace(dir.substring(dir.indexOf("=")+1, dir.indexOf("&")), "skopje");
      this.restaurants[index].directions = dir;

      // directions.push(value.getAttribute("href"));
    });
    //console.log(directions); 

    // for (const rest of this.restaurants) {
    //       if (!rest.tel.startsWith("0")) {
    //         rest.tel.concat("0", rest.tel);
    //         console.log(rest.tel)
    //       }
    //     }
    console.log(this.restaurants);
  }

  dataMapper(array: [], value: string){

  }

  constructor() { }

  ngOnInit() {
    this.getData();
    //this.mapData();
  }


}
