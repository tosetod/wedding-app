import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeddingApp';
  private firebaseConfig = {
    apiKey: "AIzaSyCo35gzxQSY5125A0VKN_UMIzfMqiBD-No",
    authDomain: "wedding-app-79194.firebaseapp.com",
    databaseURL: "https://wedding-app-79194.firebaseio.com",
    projectId: "wedding-app-79194",
    storageBucket: "wedding-app-79194.appspot.com",
    messagingSenderId: "693263720133",
    appId: "1:693263720133:web:6ef1ee938d5c2e55"
  };
  ngOnInit(){
    firebase.initializeApp(this.firebaseConfig); 
  }
}
