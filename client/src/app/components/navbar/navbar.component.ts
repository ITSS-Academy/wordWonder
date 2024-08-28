import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { EBookModel, GENRES } from '../../../models/ebook.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { UserState } from '../../../ngrxs/user/user.state';
import { EbookService } from '../../../services/ebook.service';
import { ProfileModel } from '../../../models/profile.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;

  subscriptions: Subscription[] = [];
  isStaticUser = false;

  profile$ = this.store.select('user', 'user');

  searchControl = new FormControl('');
  showDropdown = false;

  ebooks = Array.from({ length: 10 }, (_, k) =>
    this.ebookService.createNewEbook(k + 1),
  );

  readonly dialog = inject(MatDialog);
  private renderer = inject(Renderer2);

  constructor(
    private store: Store<{ auth: AuthState; user: UserState }>,
    private router: Router,
    private ebookService: EbookService,
    private cdr: ChangeDetectorRef,
  ) {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value !== '') {
          this.showDropdown = true;
          this.setPosition();
          if (this.dropdown) {
            this.renderer.setStyle(this.dropdown.nativeElement, 'opacity', '1');
            this.renderer.setStyle(
              this.dropdown.nativeElement,
              'transform',
              'translateY(0)',
            );
          }
        } else {
          if (this.dropdown) {
            this.renderer.setStyle(this.dropdown.nativeElement, 'opacity', '0');
            this.renderer.setStyle(
              this.dropdown.nativeElement,
              'transform',
              'translateY(-10px)',
            );
            this.dropdown.nativeElement.addEventListener(
              'transitionend',
              () => {
                this.showDropdown = false;
              },
              { once: true },
            );
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((val) => {
        console.log('idToken: ', val);
        if (val == '') {
          this.router.navigate(['/login']).then(() => {
            console.log('toc');
          });
        }
      }),
      this.store.select('auth', 'isStaticUser').subscribe((value) => {
        this.isStaticUser = value;
      }),
      this.profile$.subscribe(() => {
        this.cdr.detectChanges();
      }),
    );
  }

  ngAfterViewInit() {
    this.setPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setPosition();
  }

  setPosition() {
    if (this.searchInput && this.dropdown) {
      const rect = this.searchInput.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(
        this.dropdown.nativeElement,
        'top',
        `${rect.bottom + 13}px`,
      );
      this.renderer.setStyle(
        this.dropdown.nativeElement,
        'left',
        `${rect.left - 50}px`,
      );
      this.renderer.setStyle(
        this.dropdown.nativeElement,
        'width',
        `${rect.width + 66}px`,
      );
    }
  }

  openConfirmLogoutDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất?',
      },
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.logout();
      }
    });
  }

  navigateToProfile() {
    this.router.navigate(['/main/profile']).then(() => {});
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }

  navigateToEbookDetailPage(ebook: EBookModel) {
    this.router.navigate(['/main/book-info', ebook.id]).then(() => {
      this.searchControl.setValue('');
    });
  }
}
