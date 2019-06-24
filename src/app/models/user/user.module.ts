import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  partnerName: string;
  partnerAge: number;
  weddingDate: Date;

 }
