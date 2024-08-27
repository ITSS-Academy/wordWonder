import {createEffect, ofType,} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {EbookState} from "./ebook.state";
import any = jasmine.any;
import {createReducer, on} from "@ngrx/store";
import *as EbookActions from "./ebook.actions";

export const initialState: EbookState = {
  isLoading: false,
  ebooks: [],
  error: null,
};

export const ebookReducer = createReducer(
  initialState,
  on(EbookActions.listEBook, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      ebooks: [],
      error: null,
      isLoading: true,
    };
  }),
  on(EbookActions.listEBookSuccess, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      ebooks: action.ebooks,
      isLoading: false,
    };
  }),
  on(EbookActions.listEBookFailure, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);
