import {Injectable} from "@angular/core";
import {of, } from "rxjs";
import {catchError, map, switchMap,} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EbookService} from "../../services/ebook.service";
import * as EbookActions from "./ebook.actions";


@Injectable()
export class EbookEffects {
  constructor(
    private actions$: Actions,
    private ebookService: EbookService
  ) {}


}
