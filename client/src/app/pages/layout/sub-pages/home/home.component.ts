import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { EBookModel } from '../../../../../models/ebook.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import * as EbookActions from '../../../../../ngrxs/ebook/ebook.actions';
import { UserEbooksState } from '../../../../../ngrxs/user_ebooks/user_ebooks.state';
import * as UserEbookActions from '../../../../../ngrxs/user_ebooks/user_ebooks.actions';
import { UserEbookModel } from '../../../../../models/user_ebooks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  trendingList: EBookModel[] = [];
  ratingList: EBookModel[] = [];
  recommendedList: EBookModel[] = [];
  historyList: UserEbookModel[] = [];
  subscription: Subscription[] = [];

  isLoadingRating$ = this.store.select('ebook', 'isListingRatingList');
  isLoadingTrending$ = this.store.select('ebook', 'isListingTrendingList');
  isLoadingRecommended$ = this.store.select(
    'ebook',
    'isListingRecommendedList',
  );
  findListUserHistoryLoading$ = this.store.select(
    'user_ebook',
    'findListUserHistoryLoading',
  );

  constructor(
    private store: Store<{
      auth: AuthState;
      ebook: EbookState;
      user_ebook: UserEbooksState;
    }>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken != '') {
          this.store.dispatch(EbookActions.listRating({ limit: 12 }));
          this.store.dispatch(EbookActions.listTrending({ limit: 12 }));
          this.store.dispatch(EbookActions.listRecommended({ limit: 12 }));
          this.store.dispatch(UserEbookActions.findListUserHistory());
        }
      }),
      this.store.select('ebook', 'trendingList').subscribe((ebooks) => {
        if (ebooks.length > 0) {
          this.trendingList = [...ebooks];
          // console.log(this.trendingList);
        }
      }),
      this.store.select('ebook', 'ratingList').subscribe((ebooks) => {
        if (ebooks.length > 0) {
          this.ratingList = [...ebooks];
          // console.log(this.ratingList);
        }
      }),
      this.store.select('ebook', 'recommendedList').subscribe((ebooks) => {
        if (ebooks.length > 0) {
          this.recommendedList = [...ebooks];
          // console.log(this.recommendedList);
        }
      }),
      this.store
        .select('user_ebook', 'userReadingHistory')
        .subscribe((ebooks) => {
          if (ebooks.length > 0) {
            this.historyList = [...ebooks];
          }
        }),
    );
  }
}
