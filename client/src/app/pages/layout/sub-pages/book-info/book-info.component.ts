import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { NgStyle } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';
import * as EbookActions from '../../../../../ngrxs/ebook/ebook.actions';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [SharedModule, MaterialModule, NgStyle],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store<{ ebook: EbookState; auth: AuthState }>,
    private activatedRoute: ActivatedRoute,
  ) {}

  isLoadingDetail$ = this.store.select('ebook', 'isLoadingDetail');
  selectedEbook$ = this.store.select('ebook', 'selectedEbook');
  skeletonTags: number[] = [];

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.skeletonTags = Array.from({ length: 10 }, (_, i) => i + 1);
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken != '') {
          this.store.dispatch(EbookActions.getById({ id: id }));
        }
      }),
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
    this.router.navigate(['/main/reading']).then();
  }

  goBackToHome(): void {
    this.router.navigate(['/main']).then();
  }
}
