import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/core/home/home.component';
import { SigninComponent } from 'src/app/components/auth/signin/signin.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { UserPanelComponent } from 'src/app/components/user-panel/user-panel.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'panel', component: UserPanelComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
