import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserEbooksState } from '../../../../../ngrxs/user_ebooks/user_ebooks.state';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';
import * as UserEbookActions from '../../../../../ngrxs/user_ebooks/user_ebooks.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JWTTokenService } from '../../../../../services/jwttoken.service';
import * as EBookActions from '../../../../../ngrxs/ebook/ebook.actions';
import { PdfExtractState } from '../../../../../ngrxs/pdf-extract/pdf-extract.state';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import { SectionModel } from '../../../../../models/section.model';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule, InfiniteScrollDirective],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  readonly dialog = inject(MatDialog);
  ebookId = '';
  sections: SectionModel[] = [];

  idToken$ = this.store.select('auth', 'idToken');
  params$ = this.activatedRoute.params;

  isLoadingDetail$ = this.store.select('ebook', 'isLoadingDetail');

  constructor(
    private store: Store<{
      user_ebook: UserEbooksState;
      auth: AuthState;
      pdf_extract: PdfExtractState;
      ebook: EbookState;
    }>,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private jwtTokenService: JWTTokenService,
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.afterClosed().subscribe(() => {});
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.idToken$, this.params$]).subscribe(
        ([idToken, params]) => {
          if (idToken != '' && params['id']) {
            this.ebookId = params['id'];
            this.store.dispatch(EBookActions.view({ id: params['id'] }));
            this.store.dispatch(
              UserEbookActions.findByOne({ id: params['id'] }),
            );
          }
        },
      ),
      this.store.select('user_ebook', 'findOneError').subscribe((val) => {
        if (val) {
          if (val.error.message == 'UserEbook not found') {
            this.store.dispatch(
              UserEbookActions.create({
                userEbook: {
                  ebook: this.activatedRoute.snapshot.params['id'],
                },
              }),
            );
          }
        }
      }),
      this.store.select('user_ebook', 'createSuccess').subscribe((val) => {
        if (val) {
          this.store.dispatch(
            UserEbookActions.findByOne({
              id: this.activatedRoute.snapshot.params['id'],
            }),
          );
        }
      }),
      this.store.select('user_ebook', 'createError').subscribe((val) => {
        if (val) {
          this._snackBar.open(
            'Đã có lỗi xảy ra trong quá trình đồng bộ dữ liệu người dùng. Vui lòng tải lại trang !!!',
            'Đóng',
            {
              duration: 2000,
            },
          );
        }
      }),
      this.store.select('user_ebook', 'selectedUserEbook').subscribe((val) => {
        if (val) {
          this.store.dispatch(
            EBookActions.getById({
              id: this.ebookId,
              lastSection: val.lastSection == 0 ? -1 : val.lastSection,
              isNext: true,
            }),
          );
        }
      }),
      this.store.select('ebook', 'sections').subscribe((val) => {
        this.sections = val;
        if (this.isScrollUp) {
          if (this.sections.length > 0) {
            this.store.dispatch(
              UserEbookActions.read({
                ebookId: this.ebookId,
                userEbook: {
                  lastSection: this.sections[0].id,
                },
              }),
            );
          }
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(EBookActions.clear());
  }

  navigate(s: string) {
    if (this.jwtTokenService.jwtToken != '') {
      this.jwtTokenService.checkTokenExpired();
      if (this.jwtTokenService.isTokenExpired()) {
        return;
      }
    }
    this.router.navigate([s, this.activatedRoute.snapshot.params['id']]).then();
  }

  onScrollDown() {
    // console.log('scrolled down!!');
    this.isScrollUp = false;

    this.store.dispatch(
      UserEbookActions.read({
        ebookId: this.ebookId,
        userEbook: {
          lastSection: this.sections[this.sections.length - 1].id,
        },
      }),
    );
    this.store.dispatch(
      EBookActions.getById(
        EBookActions.getById({
          id: this.ebookId,
          lastSection: this.sections[this.sections.length - 1].id,
          isNext: true,
        }),
      ),
    );
  }

  isScrollUp = false;

  onScrollUp() {
    // console.log('scrolled up!!');
    this.isScrollUp = true;
    this.store.dispatch(
      EBookActions.getById(
        EBookActions.getById({
          id: this.ebookId,
          lastSection: this.sections[0].id,
          isNext: false,
        }),
      ),
    );
  }
}
