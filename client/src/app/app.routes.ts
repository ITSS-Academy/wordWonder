import { Router, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.route').then((m) => m.LOGIN_ROUTES),
    canActivate: [
      () => {
        const router = inject(Router);
        const auth = inject(Auth);
        console.log('auth.currentUser', auth.currentUser);
        if (auth.currentUser) {
          return false;
        } else {
          return true;
        }
      },
    ],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/layout/layout.route').then((m) => m.LAYOUT_ROUTES),
    canActivate: [
      () => {
        const router = inject(Router);
        const auth = inject(Auth);
        console.log('auth.currentUser', auth.currentUser);
        if (auth.currentUser) {
          return true;
        } else {
          return false;
        }
        // await router.navigate(['/loading']);
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }, // Wildcard route for a 404 page
];
