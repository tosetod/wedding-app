import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../routes/app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './components/core/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { GuestListComponent } from './components/user-tools/guest-list/guest-list.component';
import { BudgetPlannerComponent } from './components/user-tools/budget-planner/budget-planner.component';
import { VendorsComponent } from './components/user-tools/vendors/vendors.component';
import * as firebase from 'firebase';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRing, faPhone, faDirections, faGlobe, faCalculator, faClipboardList, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

firebase.initializeApp(environment.firebaseConfig);

registerLocaleData(localeDe, 'de');

library.add(faRing, faPhone, faFacebookSquare, faDirections, faGlobe, faCalculator, faClipboardList, faUtensils);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    HeaderComponent,
    UserPanelComponent,
    GuestListComponent,
    BudgetPlannerComponent,
    VendorsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
