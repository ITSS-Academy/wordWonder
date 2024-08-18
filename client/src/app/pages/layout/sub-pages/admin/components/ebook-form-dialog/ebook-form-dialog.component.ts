import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../../../shared/modules/material.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EBookModel, GENRES } from '../../../../../../../models/ebook.model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import * as UploadActions from '../../../../../../../ngrxs/file-upload/file-upload.actions';
import { FileUploadState } from '../../../../../../../ngrxs/file-upload/file-upload.state';

@Component({
  selector: 'app-ebook-form-dialog',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './ebook-form-dialog.component.html',
  styleUrl: './ebook-form-dialog.component.scss',
})
export class EbookFormDialogComponent implements OnInit, OnDestroy {
  tempId = Date.now().toString();
  genreList = GENRES;
  isLoading = false;
  subscriptions: Subscription[] = [];
  isEditMode = false;

  //form
  ebookFormGroup: FormGroup;
  name = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  content = new FormControl(null, [Validators.required]);
  imageUrl = new FormControl(null, [Validators.required]);
  translator = new FormControl('', [Validators.required]);

  nameErrorMessage = signal('');
  authorErrorMessage = signal('');
  descriptionErrorMessage = signal('');
  contentErrorMessage = signal('');
  imageUrlErrorMessage = signal('');
  translatorErrorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EBookModel,
    protected store: Store<{
      file_upload: FileUploadState;
    }>,
    protected _snackBar: MatSnackBar,
  ) {
    this.ebookFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      category: new FormControl([], [Validators.required]),
      translator: new FormControl('', [Validators.required]),
    });
    if (data != undefined) {
      this.isEditMode = true;
      console.log(data);
      this.ebookFormGroup.patchValue({ ...data });
    }

    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTitleErrorMessage());
    merge(this.author.statusChanges, this.author.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateAuthorErrorMessage());
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDescriptionErrorMessage());
    merge(this.content.statusChanges, this.content.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateContentErrorMessage());
    merge(this.imageUrl.statusChanges, this.imageUrl.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateImageUrlErrorMessage());
    merge(this.translator.statusChanges, this.translator.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTranslatorErrorMessage());

    this.store
      .select('file_upload', 'downloadPdfURL')
      .pipe(takeUntilDestroyed())
      .subscribe((downloadURL) => {
        if (downloadURL != null && downloadURL != '') {
          this.ebookFormGroup.patchValue({ pdf: downloadURL });
        }
      });

    this.store
      .select('file_upload', 'downloadCoverURL')
      .pipe(takeUntilDestroyed())
      .subscribe((downloadURL) => {
        if (downloadURL != null && downloadURL != '') {
          this.ebookFormGroup.patchValue({ image: downloadURL });
        }
      });
  }

  updateTitleErrorMessage() {
    if (this.name.hasError('required')) {
      this.nameErrorMessage.set('Bạn phải nhập giá trị');
    } else {
      this.nameErrorMessage.set('');
    }
  }

  updateAuthorErrorMessage() {
    if (this.author.hasError('required')) {
      this.authorErrorMessage.set('Bạn phải nhập giá trị');
    } else {
      this.authorErrorMessage.set('');
    }
  }

  updateDescriptionErrorMessage() {
    if (this.description.hasError('required')) {
      this.descriptionErrorMessage.set('Bạn phải nhập giá trị');
    } else {
      this.descriptionErrorMessage.set('');
    }
  }

  updateContentErrorMessage() {
    if (this.content.hasError('required')) {
      this.contentErrorMessage.set(`Bạn cần phải upload file pdf`);
    } else {
      this.contentErrorMessage.set('');
    }
  }

  updateImageUrlErrorMessage() {
    if (this.imageUrl.hasError('required')) {
      this.imageUrlErrorMessage.set('Bạn cần phải upload ảnh');
    } else {
      this.imageUrlErrorMessage.set('');
    }
  }

  updateTranslatorErrorMessage() {
    if (this.translator.hasError('required')) {
      this.translatorErrorMessage.set('Bạn phải nhập giá trị');
    } else {
      this.translatorErrorMessage.set('');
    }
  }

  onImagePicked(event: any) {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadEbookCoverFile({
        file: file!,
        path: `ebooks/${this.tempId}/cover`,
      }),
    );
  }

  onPdfPicked(event: any) {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadEbookPdfFile({
        file: file!,
        path: `ebooks/${this.tempId}/pdf`,
      }),
    );
  }

  sendForm() {
    if (this.isEditMode) {
      // console.log(eBookForm);
      return {
        ...this.data,
        ...this.ebookFormGroup.value,
      };
    } else {
      return {
        ...this.ebookFormGroup.value,
        // id: this.tempId,
      };
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(UploadActions.clearUploadState());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('file_upload', 'downloadCoverURL').subscribe((url) => {
        if (url != null) {
          this._snackBar.open('File uploaded successfully', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'downloadPdfURL').subscribe((url) => {
        if (url != null) {
          this._snackBar.open('File uploaded successfully', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'isLoading').subscribe((isLoading) => {
        this.isLoading = isLoading;
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
}
