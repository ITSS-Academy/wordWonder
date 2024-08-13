import {Component, inject} from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {TableComponent} from "./components/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {AddEbookFormDialogComponent} from "./components/add-ebook-form-dialog/add-ebook-form-dialog.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule, TableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  readonly dialog = inject(MatDialog);

  onBackButtonClick(){
    console.log('back button clicked');
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddEbookFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
