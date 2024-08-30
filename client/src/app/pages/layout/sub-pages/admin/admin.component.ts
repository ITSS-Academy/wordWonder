import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EBookModel } from '../../../../../models/ebook.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { EbookFormDialogComponent } from './components/ebook-form-dialog/ebook-form-dialog.component';
import { Store } from '@ngrx/store';
import { EbookState } from '../../../../../ngrxs/ebook/ebook.state';
import { Subscription } from 'rxjs';
import * as EbookActions from '../../../../../ngrxs/ebook/ebook.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JWTTokenService } from '../../../../../services/jwttoken.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    'select',
    'imageUrl',
    'name',
    'author',
    'translator',
    'description',
    'like',
    'view',
    'categories',
  ];
  dataSource: MatTableDataSource<EBookModel>;
  selection = new SelectionModel<EBookModel>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ebooks: EBookModel[] = [];
  isLoadingList$ = this.store.select('ebook', 'isLoadingList');
  isAdding$ = this.store.select('ebook', 'isAdding');
  isUpdating$ = this.store.select('ebook', 'isUpdating');

  //dialog
  readonly dialog = inject(MatDialog);
  readonly _snackBar = inject(MatSnackBar);

  constructor(
    private store: Store<{ ebook: EbookState }>,
    private router: Router,
    private jwtTokenService: JWTTokenService,
  ) {
    // Create n ebooks
    // this.ebooks = Array.from({ length: 10 }, (_, k) =>
    //   this.ebookService.createNewEbook(k + 1),
    // );

    this.store.dispatch(EbookActions.listAll());

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ebooks);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(EbookActions.clear());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('ebook', 'ebooks').subscribe((ebooks) => {
        this.ebooks = ebooks;
        this.initTable();
        //clear checkbox state
        this.selection.clear();
      }),
      this.store.select('ebook', 'loadingListError').subscribe((error) => {
        if (error) {
          this._snackBar.open('Đã có lỗi xảy ra trong quá trình tải', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('ebook', 'isAddingSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Tạo ebook thành công', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(EbookActions.listAll());
        }
      }),
      this.store.select('ebook', 'addingError').subscribe((error) => {
        if (error) {
          this._snackBar.open('Tạo ebook thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('ebook', 'isUpdatingSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Cập nhật ebook thành công', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(EbookActions.listAll());
        }
      }),
      this.store.select('ebook', 'updatingError').subscribe((error) => {
        if (error) {
          this._snackBar.open('Cập nhật ebook thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
    );
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.ebooks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
      // //console.log(row);
      this.selection.deselect(row);
    } else {
      this.selection.clear(); // Clear all selections
      this.selection.toggle(row); // Select the clicked row
    }
    //log the checked row
    // //console.log(this.selection.selected);
  }

  openCreateEbookDialog() {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      this.router.navigate(['/main']).then(() => {});
      return;
    }

    const dialogRef = this.dialog.open(EbookFormDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newEbook: EBookModel = {
          ...result,
          like: 0,
          view: 0,
          dateCreated: Date.now().toString(),
        };
        //console.log(newEbook);
        this.store.dispatch(EbookActions.add({ ebook: newEbook }));
      }
    });
  }

  openEditEbookDialog() {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      this.router.navigate(['/main']).then(() => {});
      return;
    }

    const dialogRef = this.dialog.open(EbookFormDialogComponent, {
      data: this.selection.selected[0],
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let updatedEbook: EBookModel = {
          ...result,
          like: this.selection.selected[0].like,
          view: this.selection.selected[0].view,
        };
        //console.log(updatedEbook);
        this.store.dispatch(
          EbookActions.update({
            ebook: updatedEbook,
            isUpdateContent: result.isUpdateContent,
          }),
        );
      }
    });
  }

  isRefreshing = false;

  reload() {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      this.router.navigate(['/main']).then(() => {});
      return;
    }
    if (this.isRefreshing) {
      this._snackBar.open('Vui lòng không spam!!!', 'Đóng', {
        duration: 2000,
      });
      return;
    }
    this.isRefreshing = true;
    this.store.dispatch(EbookActions.listAll());
    // Perform the refresh operation here
    setTimeout(() => {
      this.isRefreshing = false;
    }, 2000); // Re-enable the button after 3 seconds
  }

  navigate(url: string) {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      this.router.navigate(['/main']).then(() => {});
      return;
    }
    this.router.navigate([url]).then(() => {});
  }
}
