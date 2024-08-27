import {EBookModel} from "../../models/ebook.model";

export interface EbookState{
  ebooks:EBookModel[]
  isLoadingList: boolean;
  loadingListError: any;

  selectedEbook: EBookModel | null;
  isLoadingDetail: boolean;
  loadingDetailError: any;

  isAdding: boolean;
  isAddingSuccess: boolean;
  addingError: any;

  isUpdating: boolean;
  isUpdatingSuccess: boolean;
  updatingError: any;

  trendingList: EBookModel[];
  isListingTrendingList: boolean;
  listingTrendingListError: any;

  recommendedList: EBookModel[];
  isListingRecommendedList: boolean;
  listingRecommendedListError: any;

  ratingList: EBookModel[];
  isListingRatingList: boolean;
  listingRatingListError: any;

  isLiking: boolean;
  isLikingSuccess: boolean;
  likingError: any;

  isUnliking: boolean;
  isUnlikingSuccess: boolean;
  unlikingError: any;

  isViewing: boolean;
  isViewingSuccess: boolean;
  viewingError: any;


}
