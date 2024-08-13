import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  ebooks: EBookModel[] = [];

  constructor(private ebookService: EbookService) {}

  ngOnInit(): void {
    this.ebooks = this.ebookService.getEbooks();
  }
}
