import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const canMatchMain: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isSignedIn().pipe(
    switchMap((isSignedIn) => {
      if (isSignedIn) {
        // console.log('[Main] user is signed in');
        return of(true);
      } else {
        return authService.isStaticUser().pipe(
          map((isStaticUser) => {
            if (isStaticUser) {
              return true;
            } else {
              router.navigate(['/login']).then(() => {
                // console.log('[Main] user is not signed in')
              });
              return false;
            }
          }),
        );
      }
    }),
  );
};

export const canMatchLogin: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isSignedIn().pipe(
    switchMap((isSignedIn) => {
      if (isSignedIn) {
        router.navigate(['/main']).then(() => {
          // console.log('[Login] user is signed in')
        });
        return of(false);
      } else {
        return authService.isStaticUser().pipe(
          map((isStaticUser) => {
            if (isStaticUser) {
              router.navigate(['/main']).then(() => {
                // console.log('[Login] static user is signed in')
              });
              return false;
            } else {
              // console.log('[Login] user is not signed in');
              return true;
            }
          }),
        );
      }
    }),
  );
};

export const canMatchLoading: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isSignedIn().pipe(
    switchMap((isSignedIn) => {
      if (isSignedIn) {
        router.navigate(['/main']).then(() => {
          // console.log('[Loading] user is signed in')
        });
        return of(false);
      } else {
        return authService.isStaticUser().pipe(
          map((isStaticUser) => {
            if (isStaticUser) {
              router.navigate(['/main']).then(() => {
                // console.log('[Loading] static user is signed in')
              });
              return false;
            } else {
              router.navigate(['/login']).then(() => {
                // console.log('[Loading] user is not signed in')
              });
              return true;
            }
          }),
        );
      }
    }),
  );
};
