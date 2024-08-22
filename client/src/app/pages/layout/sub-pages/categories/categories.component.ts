import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EbookService } from '../../../../../services/ebook.service';
import { EBookModel, GENRES } from '../../../../../models/ebook.model';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  ebooks: EBookModel[] = [];
  headerName: string = '';

  readonly genre: string[] = GENRES;

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
