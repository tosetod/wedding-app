import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeddingApp';
 
  ngOnInit(){
  }

  onActivate(spinner){
    spinner.params.styles = {display: "none"};
  }

  onDeactivate(spinner){
    console.log(spinner);
  }
}
