import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {CategoriesComponent} from "../categories/categories.component";

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: 'categories',
  //   component: CategoriesComponent,
  // },
];
