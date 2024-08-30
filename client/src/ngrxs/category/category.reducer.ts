import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { CategoryState } from './category.state';

export const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  error: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.listCategory, (state, action) => {
    console.log(action.type);
    return <CategoryState>{
      ...state,
      categories: [],
      error: null,
      isLoading: true,
    };
  }),
  on(CategoryActions.listCategorySuccess, (state, action) => {
    console.log(action.type);
    return <CategoryState>{
      ...state,
      categories: action.categories,
      isLoading: false,
    };
  }),
  on(CategoryActions.listCategoryFailure, (state, action) => {
    console.log(action.type);
    return <CategoryState>{
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);
