import { ProfileModel } from './profile.model';
import { EBookModel } from './ebook.model';

export interface UserEbookModel extends ProfileModel {
  user: ProfileModel;
  ebook: EBookModel;
  readingStatus: string;
  purchaseDate: string;
  lastReadDate: string;
  isLiked: boolean;
  lastSection: number;
}
