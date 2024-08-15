import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.route').then(
            (m) => m.CATEGORIES_ROUTES,
          ),
      },
    ],
  },
];
