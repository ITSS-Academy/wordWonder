import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './sub-pages/profile/profile.component';
import { AdminComponent } from './sub-pages/admin/admin.component';
import { BookInfoComponent } from './sub-pages/book-info/book-info.component';
import { ReadingComponent } from './sub-pages/reading/reading.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./sub-pages/home/home.route').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'book-info',
        component: BookInfoComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'reading',
        component: ReadingComponent,
      },
    ],
  },
];
