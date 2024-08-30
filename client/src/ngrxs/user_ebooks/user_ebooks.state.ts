import { UserEbookModel } from '../../models/user_ebooks.model';

export interface UserEbooksState {
  createSuccess: boolean;
  createError: any;
  createLoading: boolean;

  userReadingHistory: UserEbookModel[];
  findListUserHistoryError: any;
  findListUserHistoryLoading: boolean;

  selectedUserEbook: UserEbookModel | null;
  findOneError: any;
  isFindingOne: boolean;

  isReading: boolean;
  readSuccess: boolean;
  readError: any;
}
