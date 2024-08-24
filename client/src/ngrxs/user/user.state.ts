import { ProfileModel } from '../../models/profile.model';

export interface UserState {
  user: ProfileModel | null;
  isLoading: boolean;
  loadingError: any;

  isCreatedSuccess: boolean;
  isCreating: boolean;
  creatingError: any;

  isUpdatedSuccess: boolean;
  isUpdating: boolean;
  updatingError: any;
}
