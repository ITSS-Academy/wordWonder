import { createAction, props } from '@ngrx/store';
import { EBookModel } from "../../models/ebook.model";

export const listEBook = createAction(
  '[EBook] List EBook',
);

export const listEBookSuccess = createAction(
  '[EBook] List EBook Success',
  props<{ ebooks: EBookModel[] }>(),
);

export const listEBookFailure = createAction(
  '[EBook] List EBook Failure',
  props<{ error: any }>(),
);
