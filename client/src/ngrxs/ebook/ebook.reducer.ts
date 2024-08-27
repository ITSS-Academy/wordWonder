import {EbookState} from "./ebook.state";
import {createReducer, on} from "@ngrx/store";
import * as EbookActions from "./ebook.actions";

const initialState : EbookState = {
  ebooks:[],
  isLoadingList:false,
  loadingListError:'',
  selectedEbook:null,
  isLoadingDetail:false,
  loadingDetailError:'',
  isAdding:false,
  isAddingSuccess:false,
  addingError:'',
  isUpdating:false,
  isUpdatingSuccess:false,
  updatingError:'',
  trendingList:[],
  isListingTrendingList:false,
  listingTrendingListError:'',
  recommendedList:[],
  isListingRecommendedList:false,
  listingRecommendedListError:'',
  ratingList:[],
  isListingRatingList:false,
  listingRatingListError:'',
  isLiking:false,
  isLikingSuccess:false,
  likingError:'',
  isUnliking:false,
  isUnlikingSuccess:false,
  unlikingError:'',
  isViewing:false,
  isViewingSuccess:false,
  viewingError:'',
};


export const ebookReducer = createReducer(
  initialState,
  on(EbookActions.listAll, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLoadingList:true,
      ebooks:[],
      loadingListError: undefined
    }
  }),
  on(EbookActions.listAllSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLoadingList:false,
      ebooks: action.ebooks
    }
  }),
  on(EbookActions.listAllFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLoadingList:false,
      loadingListError: 'Error loading ebooks'
    }
  }),
  on(EbookActions.listTrending, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingTrendingList:true,
      trendingList:[],
      listingTrendingListError: undefined
    }
  }),
  on(EbookActions.listTrendingSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingTrendingList:false,
      trendingList: action.ebooks
    }
  }),
  on(EbookActions.listTrendingFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingTrendingList:false,
      listingTrendingListError: 'Error loading trending ebooks'
    }
  }),
  on(EbookActions.listRecommended, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingRecommendedList:true,
      recommendedList:[],
      listingRecommendedListError: undefined
    }
  }),
  on(EbookActions.listRecommendedSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingRecommendedList:false,
      recommendedList: action.ebooks
    }
  }),
  on(EbookActions.listRecommendedFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingRecommendedList:false,
      listingRecommendedListError: 'Error loading recommended ebooks'
    }
  }),
  on(EbookActions.listRating, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingRatingList:true,
      ratingList:[],
      listingRatingListError: undefined
    }
  }),
  on(EbookActions.listRatingSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingRatingList:false,
      ratingList: action.ebooks
    }
  }),
  on(EbookActions.listRatingFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isListingRatingList:false,
      listingRatingListError: 'Error loading rating ebooks'
    }
  }),
  on(EbookActions.like, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLiking:true,
      isLikingSuccess:false,
      likingError: undefined
    }
  }),
  on(EbookActions.likeSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLiking:false,
      isLikingSuccess:true
    }
  }),
  on(EbookActions.likeFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLiking:false,
      likingError: 'Error liking ebook'
    }
  }),
  on(EbookActions.unlike, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isUnliking:true,
      isUnlikingSuccess:false,
      unlikingError: undefined
    }
  }),
  on(EbookActions.unlikeSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isUnliking:false,
      isUnlikingSuccess:true
    }
  }),
  on(EbookActions.unlikeFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isUnliking:false,
      unlikingError: 'Error unliking ebook'
    }
  }),
  on(EbookActions.view, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isViewing:true,
      isViewingSuccess:false,
      viewingError: undefined
    }
  }),
  on(EbookActions.viewSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isViewing:false,
      isViewingSuccess:true
    }
  }),
  on(EbookActions.viewFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isViewing:false,
      viewingError: 'Error viewing ebook'
    }
  }),
  on(EbookActions.add, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isAdding:true,
      isAddingSuccess:false,
      addingError: undefined
    }
  }),
  on(EbookActions.addSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isAdding:false,
      isAddingSuccess:true
    }
  }),
  on(EbookActions.addFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isAdding:false,
      addingError: 'Error adding ebook'
    }
  }),
  on(EbookActions.update, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isUpdating:true,
      isUpdatingSuccess:false,
      updatingError: undefined
    }
  }),
  on(EbookActions.updateSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isUpdating:false,
      isUpdatingSuccess:true
    }
  }),
  on(EbookActions.updateFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isUpdating:false,
      updatingError: 'Error updating ebook'
    }
  }),
  on(EbookActions.getById, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLoadingDetail:true,
      selectedEbook:null,
      loadingDetailError: undefined
    }
  }),
  on(EbookActions.getByIdSuccess, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLoadingDetail:false,
      selectedEbook: action.ebook
    }
  }),
  on(EbookActions.getByIdFailure, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      isLoadingDetail:false,
      loadingDetailError: 'Error loading ebook'
    }
  }),
  on(EbookActions.clear, (state,action) => {
    console.log(action.type)
    return <EbookState>{
      ...state,
      selectedEbook:null
    }
  }),
)
