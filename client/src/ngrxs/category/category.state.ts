import {CategoryModel} from "../../models/category.model";

export interface CategoryState {
  isLoading: boolean;
  categories: CategoryModel[];
  error: any;
}
