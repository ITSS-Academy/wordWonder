import { Component, Input, OnInit, signal } from '@angular/core';
import { EBookModel } from '../../../models/ebook.model';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { EbookCardSkeletonComponent } from '../ebook-card-skeleton/ebook-card-skeleton.component';

@Component({
  selector: 'app-ebook-card',
  standalone: true,
  imports: [MaterialModule, SharedModule, EbookCardSkeletonComponent],
  templateUrl: './ebook-card.component.html',
  styleUrls: ['./ebook-card.component.scss'],
})
export class EbookCardComponent implements OnInit {
  @Input() ebook!: EBookModel;
  isLoading = signal(true);

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }
}
