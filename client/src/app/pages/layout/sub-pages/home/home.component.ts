import { Component, OnInit  } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookCardComponent } from '../../../../components/ebook-card/ebook-card.component';
import { EBookModel } from '../../../../../models/ebook.model';
import { EbookService } from '../../../../../services/ebook.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  ebooks: EBookModel[] = [];

  constructor(private ebookService: EbookService) {}

  trackByEbookId(index: number, ebook: EBookModel): number {
    return ebook.id;
  }

  ngOnInit(): void {
    this.ebooks = this.ebookService.getEbooks();
  }


}


// categories: string[] = [];
// ebooksByCategory: { [key: string]: EBookModel[] } = {};

// ngOnInit(): void {
//   const ebooks = this.ebookService.getEbooks();
//
//   // this.categories = [...new Set(ebooks.map(ebook => ebook.category))];
//   // this.categories.forEach(category => {
//   //   this.ebooksByCategory[category] = ebooks.filter(ebook => ebook.category === category).slice(0, 7);
//   // });
// }
//
// trackByEbookId(index: number, ebook: EBookModel): number {
//   return ebook.id;
// }
//
// trackByCategory(index: number, category: string): string {
//   return category;
// }
