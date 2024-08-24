import { createAction, props } from '@ngrx/store';
import {CategoryModel} from "../../models/category.model";

export const listCategory = createAction(
  '[Category] List Category',
);

export const listCategorySuccess = createAction(
  '[Category] List Category Success',
  props<{ categories: CategoryModel[] }>(),
);

export const listCategoryFailure = createAction(
  '[Category] List Category Failure',
  props<{ error: any }>(),
);
