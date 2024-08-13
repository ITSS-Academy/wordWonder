import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EbookService } from '../../../../../services/ebook.service';
import { EBookModel } from '../../../../../models/ebook.model';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent, MatChipsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  category: string = '';
  ebooks: EBookModel[] = [];

  constructor (private route: ActivatedRoute, private ebookService: EbookService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.ebooks = this.ebookService.getEbooksByCategory(this.category);
    });
  }

  trackByEbookId(index: number, ebook: EBookModel): number {
    return ebook.id;
  }



  readonly genre: string[] = ['Hành động', 'Viễn tưởng', 'Bí ẩn', 'Khoa học', 'Tâm lý', 'Kinh dị', 'Hài hước', 'Tình cảm', 'Thể thao', 'Lịch sử', 'Học đường', 'Trinh thám', 'Phiêu lưu', 'Thần thoại', 'Cổ tích', 'Thiếu nhi', 'Ngôn tình', 'Truyện tranh', 'Light Novel', 'Tiểu thuyết'];

}
