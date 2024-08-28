import { ProfileModel } from './profile.model';

export interface UserEbookModel extends ProfileModel {
  userId: string;
  ebookId: string;
  readingStatus: string;
  purchaseDate: Date;
  lastReadDate: Date;
  isLiked: boolean;
}
