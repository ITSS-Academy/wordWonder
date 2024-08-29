import { Component, OnDestroy, OnInit } from '@angular/core';
import { EBookModel } from '../../../../../models/ebook.model';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../../../ngrxs/category/category.state';
import * as EbookActions from '../../../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import { JWTTokenService } from '../../../../../services/jwttoken.service';

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

  headerName: string = '';

  genre: any;

  isLoading$ = this.store.select('category', 'isLoading');
  error$ = this.store.select('category', 'error');

  isListingTrendingList$ = this.store.select('ebook', 'isListingTrendingList');
  isListingRecommendedList$ = this.store.select(
    'ebook',
    'isListingRecommendedList',
  );
  isListingRatingList$ = this.store.select('ebook', 'isListingRatingList');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ category: CategoryState; ebook: EbookState }>,
    private jwtTokenService: JWTTokenService,
  ) {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('category', 'categories').subscribe((categories) => {
        if (categories) {
          this.genre = categories;
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
      this.route.paramMap.subscribe((params) => {
        const type = params.get('type');
        if (type) {
          switch (type) {
            case 'history':
              this.headerName = 'Lịch sử';
              break;
            case 'trends':
              this.headerName = 'Thịnh hành';
              this.store.dispatch(EbookActions.listTrending({ limit: 100 }));
              break;
            case 'recommend':
              this.headerName = 'Đề xuất';
              this.store.dispatch(EbookActions.listRecommended({ limit: 100 }));
              break;
            case 'rank':
              this.headerName = 'Bảng xếp hạng';
              this.store.dispatch(EbookActions.listRating({ limit: 100 }));
              break;
          }
        }
      }),
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
}
