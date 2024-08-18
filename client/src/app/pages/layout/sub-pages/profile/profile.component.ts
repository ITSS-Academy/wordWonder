import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isUploadingAvatar = false;
  readonly startDate = new Date(1900, 0, 1);
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
    dob: new FormControl(new Date(), Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private store: Store<{
      file_upload: FileUploadState;
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
          this._snackBar.open('File uploaded successfully', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'isLoading').subscribe((isLoading) => {
        this.isUploadingAvatar = isLoading;
      }),
      this.store.select('file_upload', 'error').subscribe((error) => {
        if (error) {
          this._snackBar.open('Error uploading file', 'Close', {
            duration: 5000,
          });
        }
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
}
