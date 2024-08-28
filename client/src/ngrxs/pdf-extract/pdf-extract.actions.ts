import { createAction, props } from '@ngrx/store';

export const extract = createAction(
  '[PdfExtract] Extract',
  props<{ fileUrl: string }>(),
);
export const extractSuccess = createAction(
  '[PdfExtract] Extract Success',
  props<{ text: string }>(),
);
export const extractError = createAction(
  '[PdfExtract] Extract Error',
  props<{ error: any }>(),
);
