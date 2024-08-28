import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PdfExtractService } from '../../services/pdf-extract.service';
import * as PdfExtractActions from './pdf-extract.actions';

@Injectable()
export class PdfExtractEffects {
  constructor(
    private actions$: Actions,
    private pdfExtractService: PdfExtractService,
  ) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PdfExtractActions.extract),
      switchMap((action) =>
        this.pdfExtractService.extract(action.fileUrl).pipe(
          map((response) => {
            return PdfExtractActions.extractSuccess({ text: response.text });
          }),
          catchError((error) => {
            return of(PdfExtractActions.extractError({ error }));
          }),
        ),
      ),
    ),
  );
}
