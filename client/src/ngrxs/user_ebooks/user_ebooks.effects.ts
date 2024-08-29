import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserEbooksActions from './user_ebooks.actions';
import { UserEbooksService } from '../../services/user_ebooks.service';

@Injectable()
export class UserEbooksEffects {
  createUserEbook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbooksActions.create),
      mergeMap((action) =>
        this.userEbooksService.createUserEbook(action.userEbook).pipe(
          map((userEbook) => UserEbooksActions.createSuccess({ userEbook })),
          catchError((error) => of(UserEbooksActions.createFailure({ error }))),
        ),
      ),
    ),
  );

  findListUserHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbooksActions.findListUserHistory),
      mergeMap(() =>
        this.userEbooksService.findListUserHistory().pipe(
          map((userEbooks) =>
            UserEbooksActions.findListUserHistorySuccess({ userEbooks }),
          ),
          catchError((error) =>
            of(UserEbooksActions.findListUserHistoryFailure({ error })),
          ),
        ),
      ),
    ),
  );

  findByOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbooksActions.findByOne),
      mergeMap((action) =>
        this.userEbooksService.findByOne(action.id).pipe(
          map((userEbook) => UserEbooksActions.findByOneSuccess({ userEbook })),
          catchError((error) => {
            // console.log(error);
            return of(UserEbooksActions.findByOneFailure({ error }));
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private userEbooksService: UserEbooksService,
  ) {}
}
