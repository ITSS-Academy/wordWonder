import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as UploadActions from '../../../../../ngrxs/file-upload/file-upload.actions';
import { Store } from '@ngrx/store';
import { FileUploadState } from '../../../../../ngrxs/file-upload/file-upload.state';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthState } from '../../../../../ngrxs/auth/auth.state';

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

  profileForm: FormGroup = new FormGroup({
    id: new FormControl(Date.now().toString(), Validators.required),
    name: new FormControl('Phạm Hoàng Long', Validators.required),
    email: new FormControl('phamhoanglong@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl('0123456789', [
      Validators.required,
      //pattern 10 digits
      Validators.pattern('^[0-9]{10}$'),
    ]),
    avatar: new FormControl('', Validators.required),
  });

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private store: Store<{
      file_upload: FileUploadState;
      auth: AuthState;
    }>,
    protected _snackBar: MatSnackBar,
  ) {
    this.profileForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        console.log('Profile form value changed:', value);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('file_upload', 'downloadAvatarURL').subscribe((url) => {
        if (url != null) {
          this.profileForm.patchValue({ avatar: url });
          this._snackBar.open('Đăng tải ảnh thành công', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'isLoading').subscribe((isLoading) => {
        this.isUploadingAvatar = isLoading;
      }),
      this.store.select('file_upload', 'error').subscribe((error) => {
        if (error) {
          this._snackBar.open('Đã tải ảnh thất bại', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('auth', 'isStaticUser').subscribe((isStaticUser) => {
        this.isStaticUser = isStaticUser;
      }),
    );
  }

  goBackToHome(): void {
    this.router.navigate(['/main']).then();
  }

  onFileSelected(event: Event): void {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadAvatarFile({
        file: file!,
        path: `users/${this.profileForm.value.id}/avatar`,
      }),
    );
  }

  openConfirmUpdateDialog() {
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
        console.log('User confirmed logout');
      }
    });
  }
}
