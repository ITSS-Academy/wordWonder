import { createReducer, on } from '@ngrx/store';
import * as UserEbooksActions from './user_ebooks.actions';
import { UserEbooksState } from './user_ebooks.state';

const initialState: UserEbooksState = {
  createSuccess: false,
  createError: false,
  createLoading: false,
  userReadingHistory: [],
  findListUserHistoryError: undefined,
  findListUserHistoryLoading: false,
  selectedUserEbook: null,
  findOneError: undefined,
  isFindingOne: false,
  isReading: false,
  readSuccess: false,
  readError: undefined,
};
export const userEbooksReducer = createReducer(
  initialState,
  on(UserEbooksActions.create, (state, action) => {
    //console.log(action.type);
    return <UserEbooksState>{
      ...state,
      createSuccess: false,
      createLoading: true,
      createError: undefined,
    };
  }),
  on(UserEbooksActions.createSuccess, (state, action) => {
    //console.log(action.type);
    return <UserEbooksState>{
      ...state,
      createSuccess: true,
      createLoading: false,
    };
  }),
  on(UserEbooksActions.createFailure, (state, action) => {
    //console.log(action.type);
    return <UserEbooksState>{
      ...state,
      createLoading: false,
      createError: action.error,
    };
  }),
  on(UserEbooksActions.findListUserHistory, (state) => {
    //console.log(UserEbooksActions.findListUserHistory.type);
    return <UserEbooksState>{
      ...state,
      findListUserHistoryLoading: true,
      findListUserHistoryError: undefined,
      userReadingHistory: [],
    };
  }),
  on(UserEbooksActions.findListUserHistorySuccess, (state, action) => {
    //console.log(UserEbooksActions.findListUserHistorySuccess.type);
    return <UserEbooksState>{
      ...state,
      findListUserHistoryLoading: false,
      userReadingHistory: action.userEbooks,
    };
  }),
  on(UserEbooksActions.findListUserHistoryFailure, (state, action) => {
    //console.log(UserEbooksActions.findListUserHistoryFailure.type);
    return <UserEbooksState>{
      ...state,
      findListUserHistoryLoading: false,
      findListUserHistoryError: action.error,
    };
  }),
  on(UserEbooksActions.findByOne, (state) => {
    //console.log(UserEbooksActions.findByOne.type);
    return <UserEbooksState>{
      ...state,
      selectedUserEbook: null,
      isFindingOne: true,
      findOneError: undefined,
    };
  }),
  on(UserEbooksActions.findByOneSuccess, (state, action) => {
    //console.log(UserEbooksActions.findByOneSuccess.type);
    return <UserEbooksState>{
      ...state,
      selectedUserEbook: action.userEbook,
      isFindingOne: false,
    };
  }),
  on(UserEbooksActions.findByOneFailure, (state, action) => {
    //console.log(UserEbooksActions.findByOneFailure.type);
    return <UserEbooksState>{
      ...state,
      isFindingOne: false,
      findOneError: action.error,
    };
  }),
  on(UserEbooksActions.read, (state) => {
    //console.log(UserEbooksActions.read.type);
    return <UserEbooksState>{
      ...state,
      isReading: true,
      readSuccess: false,
      readError: undefined,
    };
  }),
  on(UserEbooksActions.readSuccess, (state) => {
    //console.log(UserEbooksActions.readSuccess.type);
    return <UserEbooksState>{
      ...state,
      isReading: false,
      readSuccess: true,
    };
  }),
  on(UserEbooksActions.readFailure, (state, action) => {
    //console.log(UserEbooksActions.readFailure.type);
    return <UserEbooksState>{
      ...state,
      isReading: false,
      readError: action.error,
    };
  }),
);
