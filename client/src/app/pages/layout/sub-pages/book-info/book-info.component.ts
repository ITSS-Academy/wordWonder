import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { NgStyle } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';
import * as EbookActions from '../../../../../ngrxs/ebook/ebook.actions';
import { JWTTokenService } from '../../../../../services/jwttoken.service';
import { UserEbooksState } from '../../../../../ngrxs/user_ebooks/user_ebooks.state';
import * as UserEbookActions from '../../../../../ngrxs/user_ebooks/user_ebooks.actions';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [SharedModule, MaterialModule, NgStyle],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  ebookId: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store<{
      ebook: EbookState;
      auth: AuthState;
      user_ebook: UserEbooksState;
    }>,
    private activatedRoute: ActivatedRoute,
    private jwtTokenService: JWTTokenService,
  ) {}

  isFavorite: boolean = false;

  addToFavorites(): void {
    this.store.dispatch(EbookActions.like({ id: this.ebookId }));
  }

  removeFromFavorites(): void {
    this.store.dispatch(EbookActions.unlike({ id: this.ebookId }));
  }

  isLoadingDetail$ = this.store.select('ebook', 'isLoadingDetail');
  selectedEbook$ = this.store.select('ebook', 'selectedEbook');
  skeletonTags: number[] = [];
  idToken$ = this.store.select('auth', 'idToken');
  params$ = this.activatedRoute.params;

  ngOnInit(): void {
    this.skeletonTags = Array.from({ length: 10 }, (_, i) => i + 1);
    this.subscriptions.push(
      combineLatest([this.idToken$, this.params$]).subscribe(
        ([idToken, params]) => {
          if (idToken != '' && params['id']) {
            this.ebookId = params['id'];
            this.store.dispatch(EbookActions.getById({ id: params['id'] }));
          }
        },
      ),
      this.store.select('ebook', 'isLikingSuccess').subscribe((val) => {
        if (val) {
          this.openSnackBar('Đã thêm vào yêu thích', 'Đóng');
          this.store.dispatch(UserEbookActions.findByOne({ id: this.ebookId }));
        }
      }),
      this.store.select('ebook', 'isUnlikingSuccess').subscribe((val) => {
        if (val) {
          this.openSnackBar('Đã bỏ yêu thích', 'Đóng');
          this.store.dispatch(UserEbookActions.findByOne({ id: this.ebookId }));
        }
      }),
      this.store.select('user_ebook', 'selectedUserEbook').subscribe((val) => {
        if (val) {
          this.isFavorite = val.isLiked;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  read() {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      return;
    }
    this.router.navigate(['/main/reading', this.ebookId]).then();
  }

  goBackToHome(): void {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      return;
    }
    this.router.navigate(['/main']).then();
  }
}
