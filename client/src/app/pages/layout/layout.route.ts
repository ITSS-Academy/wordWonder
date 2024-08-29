import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import * as RoleGuards from '../../guards/role.guard';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./sub-pages/home/home.route').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'book-info/:id',
        loadChildren: () =>
          import('./sub-pages/book-info/book-info.route').then(
            (m) => m.BOOK_INFO_ROUTES,
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./sub-pages/profile/profile.route').then(
            (m) => m.PROFILE_ROUTES,
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./sub-pages/admin/admin.route').then((m) => m.ADMIN_ROUTES),
        canActivate: [RoleGuards.canActivateAdmin],
      },
      {
        path: 'reading/:id',
        loadChildren: () =>
          import('./sub-pages/reading/reading.route').then(
            (m) => m.READING_ROUTES,
          ),
      },
      {
        path: 'categories/:type',
        loadChildren: () =>
          import('./sub-pages/categories/categories.route').then(
            (m) => m.CATEGORIES_ROUTES,
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
