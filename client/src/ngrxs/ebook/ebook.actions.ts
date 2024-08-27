import {createAction, props} from "@ngrx/store";
import {EBookModel} from "../../models/ebook.model";


export const listAll = createAction('[Ebook] List All');
export const listAllSuccess = createAction('[Ebook] List All Success',props<{ebooks:EBookModel[]}>());
export const listAllFailure = createAction('[Ebook] List All Failure',props<{error:any}>());

export const listTrending = createAction('[Ebook] List Trending',props<{limit:number}>());
export const listTrendingSuccess = createAction('[Ebook] List Trending Success',props<{ebooks:EBookModel[]}>());
export const listTrendingFailure = createAction('[Ebook] List Trending Failure',props<{error:any}>());

export const listRecommended = createAction('[Ebook] List Recommended',props<{limit:number}>());
export const listRecommendedSuccess = createAction('[Ebook] List Recommended Success',props<{ebooks:EBookModel[]}>());
export const listRecommendedFailure = createAction('[Ebook] List Recommended Failure',props<{error:any}>());

export const listRating = createAction('[Ebook] List Rating',props<{limit:number}>());
export const listRatingSuccess = createAction('[Ebook] List Rating Success',props<{ebooks:EBookModel[]}>());
export const listRatingFailure = createAction('[Ebook] List Rating Failure',props<{error:any}>());

export const like = createAction('[Ebook] Like',props<{id:string}>());
export const likeSuccess = createAction('[Ebook] Like Success');
export const likeFailure = createAction('[Ebook] Like Failure',props<{error:any}>());

export const unlike = createAction('[Ebook] Unlike',props<{id:string}>());
export  const unlikeSuccess = createAction('[Ebook] Unlike Success');
export const unlikeFailure = createAction('[Ebook] Unlike Failure',props<{error:any}>());

export const view = createAction('[Ebook] View',props<{id:string}>());
export const viewSuccess = createAction('[Ebook] View Success');
export const viewFailure = createAction('[Ebook] View Failure',props<{error:any}>());

export const add = createAction('[Ebook] Add',props<{ebook:EBookModel}>());
export const addSuccess = createAction('[Ebook] Add Success');
export const addFailure = createAction('[Ebook] Add Failure',props<{error:any}>());

export const update = createAction('[Ebook] Update',props<{ebook:EBookModel}>());
export const updateSuccess = createAction('[Ebook] Update Success');
export const updateFailure = createAction('[Ebook] Update Failure',props<{error:any}>());

export const getById = createAction('[Ebook] Get By Id',props<{id:string}>());
export const getByIdSuccess = createAction('[Ebook] Get By Id Success',props<{ebook:EBookModel}>());
export const getByIdFailure = createAction('[Ebook] Get By Id Failure',props<{error:any}>());

export const clear = createAction('[Ebook] Clear');
