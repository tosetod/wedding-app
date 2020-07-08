import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../routes/app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { registerLocaleData } from '@angular/common';
import localeMk from '@angular/common/locales/mk';

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
import { JwtInterceptor } from './components/interceptors/request.interceptor';

firebase.initializeApp(environment.firebaseConfig);

registerLocaleData(localeMk, 'mk');

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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
