import { PdfExtractState } from './pdf-extract.state';
import { createReducer, on } from '@ngrx/store';
import * as PdfExtractActions from './pdf-extract.actions';

const initialState: PdfExtractState = {
  text: '',
  isExtracting: false,
  error: null,
};

export const pdfExtractReducer = createReducer(
  initialState,
  on(PdfExtractActions.extract, (state, action) => {
    console.log(action.type);
    return <PdfExtractState>{
      ...state,
      text: '',
      isExtracting: true,
      error: null,
    };
  }),
  on(PdfExtractActions.extractSuccess, (state, action) => {
    console.log(action.type);
    return <PdfExtractState>{
      ...state,
      text: action.text,
      isExtracting: false,
      error: null,
    };
  }),
  on(PdfExtractActions.extractError, (state, action) => {
    console.log(action.type);
    return <PdfExtractState>{
      ...state,
      isExtracting: false,
      error: action.error,
    };
  }),
);
