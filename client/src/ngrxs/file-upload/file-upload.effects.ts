import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CloudStorageService } from '../../services/cloud-storage.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UploadActions from './file-upload.actions';
import { of } from 'rxjs';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions$: Actions,
    private cloudStorageService: CloudStorageService,
  ) {}

  uploadEbookCoverFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadEbookCoverFile),
      mergeMap(({ file, path }) =>
        this.cloudStorageService.uploadFile(file, path).pipe(
          map((result) => {
            if (typeof result === 'number') {
              return UploadActions.uploadFileProgress({ progress: result });
            } else {
              return UploadActions.uploadEbookCoverFileSuccess({
                downloadURL: result,
              });
            }
          }),
          catchError((error) =>
            of(UploadActions.uploadEbookCoverFileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  uploadEbookPdfFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadEbookPdfFile),
      mergeMap(({ file, path }) =>
        this.cloudStorageService.uploadFile(file, path).pipe(
          map((result) => {
            if (typeof result === 'number') {
              return UploadActions.uploadFileProgress({ progress: result });
            } else {
              return UploadActions.uploadEbookPdfFileSuccess({
                downloadURL: result,
              });
            }
          }),
          catchError((error) =>
            of(UploadActions.uploadEbookPdfFileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  uploadAvatarFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadAvatarFile),
      mergeMap(({ file, path }) =>
        this.cloudStorageService.uploadFile(file, path).pipe(
          map((result) => {
            if (typeof result === 'number') {
              return UploadActions.uploadFileProgress({ progress: result });
            } else {
              return UploadActions.uploadAvatarFileSuccess({
                downloadURL: result,
              });
            }
          }),
          catchError((error) =>
            of(UploadActions.uploadAvatarFileFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
