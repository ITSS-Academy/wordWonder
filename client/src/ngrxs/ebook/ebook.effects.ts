import { Injectable } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, mergeMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as EBookActions from './ebook.actions';
import { EbookService } from '../../services/ebook.service';

@Injectable()
export class EbookEffects {
  constructor(
    private actions$: Actions,
    private ebookService: EbookService,
  ) {}

  listAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.listAll),
      mergeMap(() =>
        this.ebookService.getEbookLists().pipe(
          map((ebooks) => {
            return EBookActions.listAllSuccess({ ebooks });
          }),
          catchError((e) => {
            return of(
              EBookActions.listAllFailure({ error: 'Error loading ebooks' }),
            );
          }),
        ),
      ),
    ),
  );

  listTrending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.listTrending),
      mergeMap((action) =>
        this.ebookService.listTrendEbooks(action.limit).pipe(
          map((ebooks) => {
            return EBookActions.listTrendingSuccess({ ebooks });
          }),
          catchError((e) => {
            return of(
              EBookActions.listTrendingFailure({
                error: 'Error loading trending ebooks',
              }),
            );
          }),
        ),
      ),
    ),
  );

  listRecommended$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.listRecommended),
      mergeMap((action) =>
        this.ebookService.getRecommendEbooks(action.limit).pipe(
          map((ebooks) => {
            return EBookActions.listRecommendedSuccess({ ebooks });
          }),
          catchError((e) => {
            return of(
              EBookActions.listRecommendedFailure({
                error: 'Error loading recommended ebooks',
              }),
            );
          }),
        ),
      ),
    ),
  );

  listRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.listRating),
      mergeMap((action) =>
        this.ebookService.getEbookByRating(action.limit).pipe(
          map((ebooks) => {
            return EBookActions.listRatingSuccess({ ebooks });
          }),
          catchError((e) => {
            return of(
              EBookActions.listRatingFailure({
                error: 'Error loading rating ebooks',
              }),
            );
          }),
        ),
      ),
    ),
  );

  like$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.like),
      mergeMap((action) =>
        this.ebookService.like(action.id).pipe(
          map(() => {
            return EBookActions.likeSuccess();
          }),
          catchError((e) => {
            return of(
              EBookActions.likeFailure({ error: 'Error liking ebook' }),
            );
          }),
        ),
      ),
    ),
  );

  unlike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.unlike),
      mergeMap((action) =>
        this.ebookService.disLike(action.id).pipe(
          map(() => {
            return EBookActions.unlikeSuccess();
          }),
          catchError((e) => {
            return of(
              EBookActions.unlikeFailure({ error: 'Error unliking ebook' }),
            );
          }),
        ),
      ),
    ),
  );

  view$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.view),
      mergeMap((action) =>
        this.ebookService.increaseView(action.id).pipe(
          map(() => {
            return EBookActions.viewSuccess();
          }),
          catchError((e) => {
            return of(
              EBookActions.viewFailure({ error: 'Error viewing ebook' }),
            );
          }),
        ),
      ),
    ),
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.add),
      mergeMap((action) =>
        this.ebookService.addEbook(action.ebook).pipe(
          map(() => {
            return EBookActions.addSuccess();
          }),
          catchError((e) => {
            return of(EBookActions.addFailure({ error: 'Error adding ebook' }));
          }),
        ),
      ),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.update),
      mergeMap((action) =>
        this.ebookService
          .updateEbook(action.ebook, action.isUpdateContent)
          .pipe(
            map(() => {
              return EBookActions.updateSuccess();
            }),
            catchError((e) => {
              return of(
                EBookActions.updateFailure({ error: 'Error updating ebook' }),
              );
            }),
          ),
      ),
    ),
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookActions.getById),
      mergeMap((action) =>
        this.ebookService.getEbookDetail(action.id, action.lastSection).pipe(
          map((response) => {
            return EBookActions.getByIdSuccess({
              ebook: response.ebook,
              section: response.section,
            });
          }),
          catchError((e) => {
            return of(
              EBookActions.getByIdFailure({ error: 'Error getting ebook' }),
            );
          }),
        ),
      ),
    ),
  );
}
