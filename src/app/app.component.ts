import { Component, OnInit } from '@angular/core';

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
