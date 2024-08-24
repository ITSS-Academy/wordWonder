import { UserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

const initialState: UserState = {
  user: null,
  isLoading: false,
  loadingError: '',
  isCreatedSuccess: false,
  isCreating: false,
  creatingError: '',
  isUpdatedSuccess: false,
  isUpdating: false,
  updatingError: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.create, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreating: true,
      creatingError: null,
      isCreatedSuccess: false,
    };
  }),
  on(UserActions.createSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreating: false,
      isCreatedSuccess: true,
    };
  }),
  on(UserActions.createFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreating: false,
      creatingError: action.error,
    };
  }),
  on(UserActions.update, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdating: true,
      updatingError: null,
      isUpdatedSuccess: false,
    };
  }),
  on(UserActions.updateSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdating: false,
      isUpdatedSuccess: true,
    };
  }),
  on(UserActions.updateFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdating: false,
      updatingError: action.error,
    };
  }),
  on(UserActions.getById, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isLoading: true,
      user: null,
      loadingError: null,
    };
  }),
  on(UserActions.getByIdSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isLoading: false,
      user: action.user,
    };
  }),
  on(UserActions.getByIdFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isLoading: false,
      loadingError: action.error,
    };
  }),
);
