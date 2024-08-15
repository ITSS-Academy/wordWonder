import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EbookService } from '../../../../../services/ebook.service';
import { EBookModel } from '../../../../../models/ebook.model';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent, MatChipsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  ebooks: EBookModel[] = [];
  headerName: string = '';

  readonly genre: string[] = [
    'Hành động',
    'Viễn tưởng',
    'Bí ẩn',
    'Khoa học',
    'Phép thuật',
    'Tâm lý',
    'Kinh dị',
    'Hài hước',
    'Tình cảm',
    'Thể thao',
    'Lịch sử',
    'Học đường',
    'Cổ tích',
    'Phiêu lưu',
    'Thần thoại',
    'Trinh thám',
    'Thiếu nhi',
    'Ngôn tình',
    'Truyện tranh',
    'Light Novel',
    'Tiểu thuyết',
  ];

  constructor(
    private ebookService: EbookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.ebooks = this.ebookService.getEbooks();
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
}
