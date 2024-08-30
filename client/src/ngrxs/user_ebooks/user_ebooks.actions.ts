import { createAction, props } from '@ngrx/store';
import { UserEbookModel } from '../../models/user_ebooks.model';

export const create = createAction(
  '[UserEbooks] Create',
  props<{ userEbook: any }>(),
);
export const createSuccess = createAction(
  '[UserEbooks] Create Success',
  props<{ userEbook: UserEbookModel }>(),
);
export const createFailure = createAction(
  '[UserEbooks] Create Failure',
  props<{ error: any }>(),
);

export const findListUserHistory = createAction(
  '[UserEbooks] Find List User History',
);
export const findListUserHistorySuccess = createAction(
  '[UserEbooks] Find List User History Success',
  props<{ userEbooks: UserEbookModel[] }>(),
);
export const findListUserHistoryFailure = createAction(
  '[UserEbooks] Find List User History Failure',
  props<{ error: any }>(),
);

export const findByOne = createAction(
  '[UserEbooks] Find By One',
  props<{ id: string }>(),
);
export const findByOneSuccess = createAction(
  '[UserEbooks] Find By One Success',
  props<{ userEbook: UserEbookModel }>(),
);
export const findByOneFailure = createAction(
  '[UserEbooks] Find By One Failure',
  props<{ error: any }>(),
);

export const read = createAction(
  '[UserEbooks] Read',
  props<{ ebookId: string; userEbook: any }>(),
);
export const readSuccess = createAction('[UserEbooks] Read Success');
export const readFailure = createAction(
  '[UserEbooks] Read Failure',
  props<{ error: any }>(),
);
