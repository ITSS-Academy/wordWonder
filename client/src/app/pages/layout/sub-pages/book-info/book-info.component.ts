import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent {
  image: string = 'assets/harry_potter_va_hon_da_phu_thuy__j_k_rowling 3.png';
}
