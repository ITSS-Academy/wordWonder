import {Component, Input} from '@angular/core';
import {EBookModel} from "../../../models/ebook.model";
import {MatCardModule} from '@angular/material/card';
import {EbookService} from "../../../services/ebook.service";

@Component({
  selector: 'app-ebook-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ebook-card.component.html',
  styleUrl: './ebook-card.component.scss'
})
export class EbookCardComponent {

  @Input() ebooks: EBookModel[] = [];

  constructor(private ebookService: EbookService) {}

  ngOnInit(): void {
    this.ebooks = this.ebookService.getEbooks();
  }
}
