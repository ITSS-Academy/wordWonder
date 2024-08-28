import { createReducer, on } from '@ngrx/store';
import * as UserEbooksActions from './user_ebooks.actions';
import { UserEbooksState } from './user_ebooks.state';

const initialState: UserEbooksState = {
  createSuccess: false,
  createFailure: false,
  createLoading: false,

  findListUserHistorySuccess: false,
  findListUserHistoryFailure: false,
  findListUserHistoryLoading: false,

  findByOneSuccess: false,
  findByOneFailure: false,
  findByOneLoading: false,
};
export const userEbooksReducer = createReducer(
  initialState,
  on(UserEbooksActions.create, (state, action) => {
    console.log(action.type);
    return <UserEbooksState>{ ...state, loading: true };
  }),
  on(UserEbooksActions.createSuccess, (state, action) => {
    console.log(action.type);
    return <UserEbooksState>{
      ...state,
      loading: false,
      userEbook: action.userEbook,
    };
  }),
  on(UserEbooksActions.createFailure, (state, action) => {
    console.log(action.type);
    return <UserEbooksState>{
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(UserEbooksActions.findListUserHistory, (state) => {
    console.log(UserEbooksActions.findListUserHistory.type);
    return <UserEbooksState>{
      ...state,
      userEbookHistoryLoading: true,
    };
  }),
  on(UserEbooksActions.findListUserHistorySuccess, (state, action) => {
    console.log(UserEbooksActions.findListUserHistorySuccess.type);
    return <UserEbooksState>{
      ...state,
      userEbookHistoryLoading: false,
      userEbookHistory: action.userEbooks,
      userEbookHistorySuccess: true,
    };
  }),
  on(UserEbooksActions.findListUserHistoryFailure, (state, action) => {
    console.log(UserEbooksActions.findListUserHistoryFailure.type);
    return <UserEbooksState>{
      ...state,
      userEbookHistoryLoading: false,
      userEbookHistoryError: action.error,
    };
  }),
  on(UserEbooksActions.findByOne, (state) => {
    console.log(UserEbooksActions.findByOne.type);
    return <UserEbooksState>{
      ...state,
      loading: true,
    };
  }),
  on(UserEbooksActions.findByOneSuccess, (state, action) => {
    console.log(UserEbooksActions.findByOneSuccess.type);
    return <UserEbooksState>{
      ...state,
      loading: false,
      userEbook: action.userEbook,
    };
  }),
  on(UserEbooksActions.findByOneFailure, (state, action) => {
    console.log(UserEbooksActions.findByOneFailure.type);
    return <UserEbooksState>{
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
