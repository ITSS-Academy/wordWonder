import { Routes } from '@angular/router';
import * as AuthGuards from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/loading', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.route').then((m) => m.LOGIN_ROUTES),
    canActivate: [AuthGuards.canActivateLogin],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/layout/layout.route').then((m) => m.LAYOUT_ROUTES),
    canActivate: [AuthGuards.canActivateMain],
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('./pages/loading/loading.route').then((m) => m.LOADING_ROUTES),
    canMatch: [AuthGuards.canMatchLoading],
  },
  {
    path: '**',
    redirectTo: '/loading',
    pathMatch: 'full',
  },
];
