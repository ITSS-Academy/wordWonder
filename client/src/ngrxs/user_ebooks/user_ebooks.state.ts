import { UserEbookModel } from '../../models/user_ebooks.model';

export interface UserEbooksState {
  createSuccess: boolean;
  createFailure: boolean;
  createLoading: boolean;

  findListUserHistorySuccess: boolean;
  findListUserHistoryFailure: boolean;
  findListUserHistoryLoading: boolean;

  findByOneSuccess: boolean;
  findByOneFailure: boolean;
  findByOneLoading: boolean;
}
