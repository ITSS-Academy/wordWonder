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
    private store: Store<{ ebook: EbookState; auth: AuthState }>,
    private activatedRoute: ActivatedRoute,
    private jwtTokenService: JWTTokenService,
  ) {}

  isFavorite: boolean = false;

  addToFavorites(): void {
    this.isFavorite = true;
    this.openSnackBar('Đã thêm vào yêu thích', 'Đóng');
  }

  removeFromFavorites(): void {
    this.isFavorite = false;
    this.openSnackBar('Đã bỏ yêu thích', 'Đóng');
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
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  read() {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      return;
    }
    this.router.navigate(['/main/reading']).then();
  }

  goBackToHome(): void {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      return;
    }
    this.router.navigate(['/main']).then();
  }
}
