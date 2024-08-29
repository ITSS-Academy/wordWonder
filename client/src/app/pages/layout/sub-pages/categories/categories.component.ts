import { Component, OnDestroy, OnInit } from '@angular/core';
import { EBookModel } from '../../../../../models/ebook.model';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../../../ngrxs/category/category.state';
import * as EbookActions from '../../../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import { JWTTokenService } from '../../../../../services/jwttoken.service';
import { UserEbooksState } from '../../../../../ngrxs/user_ebooks/user_ebooks.state';
import * as UserEbookActions from '../../../../../ngrxs/user_ebooks/user_ebooks.actions';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';
import { CategoryModel } from '../../../../../models/category.model';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  ebooks: EBookModel[] = [];
  filterEbooks: EBookModel[] = [];
  selectedChip: CategoryModel[] = [];

  headerName: string = '';

  genres: CategoryModel[] = [];

  idToken$ = this.store.select('auth', 'idToken');
  params$ = this.route.paramMap;

  isLoading$ = this.store.select('category', 'isLoading');
  error$ = this.store.select('category', 'error');

  isListingTrendingList$ = this.store.select('ebook', 'isListingTrendingList');
  isListingRecommendedList$ = this.store.select(
    'ebook',
    'isListingRecommendedList',
  );
  isListingRatingList$ = this.store.select('ebook', 'isListingRatingList');
  findListUserHistoryLoading$ = this.store.select(
    'user_ebook',
    'findListUserHistoryLoading',
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{
      category: CategoryState;
      ebook: EbookState;
      user_ebook: UserEbooksState;
      auth: AuthState;
    }>,
    private jwtTokenService: JWTTokenService,
  ) {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('category', 'categories').subscribe((categories) => {
        if (categories) {
          this.genres = categories;
        }
      }),
      this.store
        .select('user_ebook', 'userReadingHistory')
        .subscribe((userEbooks) => {
          if (userEbooks.length > 0) {
            //map ebook from userEbooks to this.ebooks
            this.ebooks = userEbooks.map((userEbook) => {
              return userEbook.ebook;
            });
          }
        }),
      this.store.select('ebook', 'trendingList').subscribe((ebooks) => {
        if (ebooks.length > 0) {
          this.ebooks = [...ebooks];
        }
      }),
      this.store.select('ebook', 'recommendedList').subscribe((ebooks) => {
        if (ebooks.length > 0) {
          this.ebooks = [...ebooks];
        }
      }),
      this.store.select('ebook', 'ratingList').subscribe((ebooks) => {
        if (ebooks.length > 0) {
          this.ebooks = [...ebooks];
        }
      }),
      combineLatest([this.idToken$, this.params$]).subscribe(
        ([idToken, params]) => {
          const type = params.get('type');
          if (type) {
            switch (type) {
              case 'history':
                this.headerName = 'Lịch sử';
                if (idToken) {
                  this.store.dispatch(UserEbookActions.findListUserHistory());
                }
                break;
              case 'trends':
                this.headerName = 'Thịnh hành';
                if (idToken) {
                  this.store.dispatch(
                    EbookActions.listTrending({ limit: 100 }),
                  );
                }
                break;
              case 'recommend':
                this.headerName = 'Đề xuất';
                if (idToken) {
                  this.store.dispatch(
                    EbookActions.listRecommended({ limit: 100 }),
                  );
                }
                break;
              case 'rank':
                this.headerName = 'Bảng xếp hạng';
                if (idToken) {
                  this.store.dispatch(EbookActions.listRating({ limit: 100 }));
                }
                break;
            }
          }
        },
      ),
    );
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  navigateBack(): void {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      return;
    }
    this.router.navigate(['/main']).then(() => {});
  }

  filterList($event: MatChipSelectionChange, index: number) {
    if ($event.selected) {
      this.selectedChip.push(this.genres[index]);
    } else {
      this.selectedChip = this.selectedChip.filter(
        (item) => item.id !== this.genres[index].id,
      );
    }

    //the filterEbooks will add the ebooks that have one of the selected genres
    this.filterEbooks = this.ebooks.filter((ebook) => {
      return ebook.categories.some((category) => {
        return this.selectedChip.some((selected) => {
          return category.id === selected.id;
        });
      });
    });
    console.log(this.filterEbooks);
  }
}
