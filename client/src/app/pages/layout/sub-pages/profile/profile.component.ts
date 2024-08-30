import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as UploadActions from '../../../../../ngrxs/file-upload/file-upload.actions';
import * as UserActions from '../../../../../ngrxs/user/user.actions'; // Add user actions
import { Store } from '@ngrx/store';
import { FileUploadState } from '../../../../../ngrxs/file-upload/file-upload.state';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';
import { UserState } from '../../../../../ngrxs/user/user.state';
import { JWTTokenService } from '../../../../../services/jwttoken.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isStaticUser = false;
  isUploadingAvatar = false;

  isUpdating$ = this.store.select('user', 'isUpdating');
  isLoading$ = this.store.select('user', 'isLoading');

  profileForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nickName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      //pattern 10 digits
      Validators.pattern('^[0-9]{10}$'),
    ]),
    photoURL: new FormControl('', Validators.required),
  });

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private store: Store<{
      file_upload: FileUploadState;
      auth: AuthState;
      user: UserState; // Add user state
    }>,
    protected _snackBar: MatSnackBar,
    private jwtTokenService: JWTTokenService,
  ) {
    // this.profileForm.valueChanges
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((value) => {
    //     console.log('Profile form value changed:', value);
    //   });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(UserActions.reset());
    this.store.dispatch(UploadActions.reset());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('file_upload', 'downloadAvatarURL').subscribe((url) => {
        if (url != null) {
          this.profileForm.patchValue({ photoURL: url });
          this._snackBar.open('Đăng tải ảnh thành công', 'Đóng', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'isLoading').subscribe((isLoading) => {
        this.isUploadingAvatar = isLoading;
      }),
      this.store.select('file_upload', 'error').subscribe((error) => {
        if (error) {
          this._snackBar.open('Đã tải ảnh thất bại', 'Đóng', {
            duration: 5000,
          });
        }
      }),
      this.store.select('auth', 'isStaticUser').subscribe((isStaticUser) => {
        this.isStaticUser = isStaticUser;
      }),
      //  Các subscription để lắng nghe trạng thái của user profile
      this.store.select('user', 'user').subscribe((user) => {
        if (user) {
          this.profileForm.patchValue({ ...user });
          console.log(this.profileForm.value);
        }
      }),
      this.store.select('user', 'isUpdatedSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Cập nhật thông tin thành công', 'Close', {
            duration: 5000,
          });
          this.store.dispatch(UserActions.getById());
        }
      }),
      this.store.select('user', 'updatingError').subscribe((error) => {
        if (error) {
          this._snackBar.open('Cập nhật thông tin thất bại', 'Đóng', {
            duration: 5000,
          });
        }
      }),
      this.store.select('user', 'loadingError').subscribe((error) => {
        if (error) {
          this._snackBar.open(
            'Lỗi khi tải thông tin người dùng. Vui lòng tải lại',
            'Đóng',
            {
              duration: 5000,
            },
          );
        }
      }),
    );
  }

  onFileSelected(event: Event): void {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadAvatarFile({
        file: file!,
        path: `users/${this.profileForm.value.id}/avatar`,
        isPdf: false,
      }),
    );
  }

  openConfirmUpdateDialog() {
    if (this.jwtTokenService.jwtToken != '') {
      this.jwtTokenService.checkTokenExpired();
      if (this.jwtTokenService.isTokenExpired()) {
        return;
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Cập nhật hồ sơ',
        message: 'Xác nhận cập nhật hồ sơ?',
      },
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.store.dispatch(
          UserActions.update({ user: this.profileForm.value }),
        );
        // console.log('User confirmed logout');
      }
    });
  }

  navigate(url: string) {
    if (this.jwtTokenService.jwtToken != '') {
      this.jwtTokenService.checkTokenExpired();
      if (this.jwtTokenService.isTokenExpired()) {
        return;
      }
    }
    this.router.navigate([url]).then(() => {});
  }
}
