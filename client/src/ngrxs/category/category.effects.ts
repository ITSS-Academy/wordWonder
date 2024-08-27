import {Injectable} from "@angular/core";
import {CategoryService} from "../../services/category.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as CategoryActions from "./category.actions";
import {of, mergeMap, } from "rxjs";
import {catchError, map,} from "rxjs/operators";


@Injectable()
export class CategoryEffects {
  constructor(
    private actions$ : Actions,
    private categoryService: CategoryService,
  ) {}

  getCategories$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.listCategory),
    mergeMap(() => this.categoryService.getCategories()
      .pipe(
        map(categories => {
          return CategoryActions.listCategorySuccess({categories});
        }),
        catchError((error) => {
          return of(CategoryActions.listCategoryFailure(error));
        }
      )
  ))))

}
