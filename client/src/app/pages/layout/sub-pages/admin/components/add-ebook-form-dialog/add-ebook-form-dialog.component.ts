import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ebook-form-dialog',
  standalone: true,
  imports: [MaterialModule, SharedModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './add-ebook-form-dialog.component.html',
  styleUrls: ['./add-ebook-form-dialog.component.scss']
})
export class AddEbookFormDialogComponent {
  bookName: string = '';
  authorName: string = '';
  description: string = '';
  publishYear: string = '';
  bookCoverImage: any;
  bookFile: any;
}
