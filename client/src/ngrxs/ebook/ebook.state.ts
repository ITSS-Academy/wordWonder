import {EBookModel} from '../../models/ebook.model';

export interface EbookState {
  isLoading: boolean;
  ebooks: EBookModel[];
  error: any;
}
