import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  scrollDirection: 'vertical' | 'horizontal' = 'vertical';

  setScrollDirection(direction: 'vertical' | 'horizontal') {
    this.scrollDirection = direction;
  }
}
