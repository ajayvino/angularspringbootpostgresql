import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"customer",
    redirectTo:"customer/home",
    pathMatch:'full'
  },
  {
    path:"customer/home",
    component:HomeComponent
  }
];
