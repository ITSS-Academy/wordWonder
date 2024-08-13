import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  // redirect to `login`
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.route').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/layout/layout.route').then((m) => m.LAYOUT_ROUTES),
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
