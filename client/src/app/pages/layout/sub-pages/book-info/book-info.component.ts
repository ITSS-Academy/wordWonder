import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [SharedModule, MaterialModule, NgStyle],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent {

  url=`../public/assets/harry_potter_va_hon_da_phu_thuy__j_k_rowling%203.png`;
  style = 'background-image: url(' + this.url + ')';
}
