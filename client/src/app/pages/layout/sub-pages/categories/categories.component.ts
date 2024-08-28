import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EbookService } from '../../../../../services/ebook.service';
import { EBookModel } from '../../../../../models/ebook.model';
import { CategoryService } from '../../../../../services/category.service';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { CardService } from '../../../../../services/card.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CategoriesComponent implements OnInit {
  ebooks: EBookModel[] = [];
  headerName: string = '';
  genre: any;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.ebooks = this.cardService.getEbooks();

    // Gọi API để lấy danh sách thể loại với delay 2s
    this.categoryService
      .getCategories()
      .pipe(
        delay(2000),
        catchError((error) => {
          this.error = 'Không tải được danh sách thể loại';
          this.isLoading = false;
          return of([]); // Trả về mảng rỗng trong trường hợp lỗi
        }),
      )
      .subscribe((categories) => {
        this.genre = categories;
        this.isLoading = false;
      });

    this.route.paramMap.subscribe((params) => {
      const type = params.get('type');
      if (type) {
        switch (type) {
          case 'history':
            this.headerName = 'Lịch sử';
            break;
          case 'trends':
            this.headerName = 'Thịnh hành';
            break;
          case 'recommend':
            this.headerName = 'Đề xuất';
            break;
          case 'rank':
            this.headerName = 'Bảng xếp hạng';
            break;
        }
      }
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
