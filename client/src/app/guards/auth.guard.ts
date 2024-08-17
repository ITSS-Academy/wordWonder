import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

export const canActivateMain: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          return true;
        } else {
          router
            .navigate(['/login'])
            .then((r) => console.log('user is not signed in'));
          return false;
        }
      }),
    );
};

export const canActivateLogin: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          router
            .navigate(['/main'])
            .then((r) => console.log('user is signed in'));
          return false;
        } else {
          return true;
        }
      }),
    );
};

export const canMatchLoading: CanMatchFn = () => {
  const router = inject(Router);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          router.navigate(['/main']).then(() => {
            console.log('user is signed in');
          });
          return true;
        } else {
          router.navigate(['/login']).then(() => {
            console.log('user is not signed in');
          });
          return true;
        }
      }),
    );
};
