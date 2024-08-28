import { createAction, props } from '@ngrx/store';
import { UserEbookModel } from '../../models/user_ebooks.model';

export const create = createAction(
  '[UserEbooks] Create',
  props<{ userEbook: UserEbookModel }>(),
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
