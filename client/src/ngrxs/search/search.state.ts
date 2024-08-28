import { EBookModel } from '../../models/ebook.model';

export interface SearchState {
  searchResults: EBookModel[];
  loading: boolean;
  error: any;
}
