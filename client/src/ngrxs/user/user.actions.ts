import { createAction, props } from '@ngrx/store';
import { ProfileModel } from '../../models/profile.model';

export const create = createAction('[User] Create');
export const createSuccess = createAction('[User] Create Success');
export const createFailure = createAction(
  '[User] Create Failure',
  props<{ error: any }>(),
);

export const update = createAction(
  '[User] Update',
  props<{ user: ProfileModel }>(),
);
export const updateSuccess = createAction('[User] Update Success');
export const updateFailure = createAction(
  '[User] Update Failure',
  props<{ error: any }>(),
);

export const getById = createAction('[User] Get By Id');
export const getByIdSuccess = createAction(
  '[User] Get By Id Success',
  props<{ user: ProfileModel }>(),
);
export const getByIdFailure = createAction(
  '[User] Get By Id Failure',
  props<{ error: any }>(),
);
