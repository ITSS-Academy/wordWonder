import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EBookModel } from '../../../../../models/ebook.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { createNewEbook } from '../../../../components/navbar/navbar.component';
import { SelectionModel } from '@angular/cdk/collections';
import { EbookFormDialogComponent } from './components/ebook-form-dialog/ebook-form-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'imageUrl',
    'name',
    'author',
    'translator',
    'description',
    'dateCreated',
    'like',
    'view',
    'category',
  ];
  dataSource: MatTableDataSource<EBookModel>;
  selection = new SelectionModel<EBookModel>(true, []);
  ebooks: EBookModel[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //dialog
  readonly dialog = inject(MatDialog);

  constructor() {
    // Create 100 users
    this.ebooks = Array.from({ length: 10 }, (_, k) => createNewEbook(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ebooks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EBookModel): string {
    if (!row) {
      return `${this.selection.hasValue() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id) + 1}`;
  }

  toggle(row: EBookModel) {
    if (this.selection.isSelected(row)) {
      // console.log(row);
      this.selection.deselect(row);
    } else {
      this.selection.clear(); // Clear all selections
      this.selection.toggle(row); // Select the clicked row
    }
    //log the checked row
    // console.log(this.selection.selected);
  }

  openCreateEbookDialog() {
    const dialogRef = this.dialog.open(EbookFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newEbook: EBookModel = {
          ...result,
          id: (this.dataSource.data.length + 1).toString(),
          like: 0,
          view: 0,
          dateCreated: new Date().toDateString(),
        };
        this.ebooks.push(newEbook);
        this.dataSource = new MatTableDataSource(this.ebooks);
        console.log(newEbook);
      }
    });
  }

  openEditEbookDialog() {
    const dialogRef = this.dialog.open(EbookFormDialogComponent, {
      data: this.selection.selected[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // let newEbook: EBookModel = {
        //   ...result,
        //   id: (this.dataSource.data.length + 1).toString(),
        //   like: 0,
        //   view: 0,
        //   dateCreated: new Date().toDateString(),
        // };
        console.log(result);
      }
    });
  }
}
