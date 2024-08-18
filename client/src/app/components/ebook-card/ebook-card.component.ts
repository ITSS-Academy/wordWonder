import { Component, Input, OnInit } from '@angular/core';
import { EBookModel } from '../../../models/ebook.model';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-ebook-card',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './ebook-card.component.html',
  styleUrl: './ebook-card.component.scss',
})
export class EbookCardComponent implements OnInit {
  @Input() ebook!: EBookModel;

  constructor() {}

  ngOnInit(): void {}
}
