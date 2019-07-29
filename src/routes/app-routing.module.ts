import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/core/home/home.component';
import { SigninComponent } from 'src/app/components/auth/signin/signin.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { UserPanelComponent } from 'src/app/components/user-panel/user-panel.component';
import { AuthGuard } from 'src/app/services/auth/auth-guard.service';
import { GuestListComponent } from 'src/app/components/user-tools/guest-list/guest-list.component';
import { BudgetPlannerComponent } from 'src/app/components/user-tools/budget-planner/budget-planner.component';
import { VendorsComponent } from 'src/app/components/user-tools/vendors/vendors.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'panel', component: UserPanelComponent},//, canActivate: [AuthGuard] 
  { path: 'panel/guest-list', component: GuestListComponent},//, canActivate: [AuthGuard]
  { path: 'panel/budget-planner', component: BudgetPlannerComponent}, //, canActivate: [AuthGuard]
  { path: 'panel/vendors', component: VendorsComponent},//, canActivate: [AuthGuard]
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
