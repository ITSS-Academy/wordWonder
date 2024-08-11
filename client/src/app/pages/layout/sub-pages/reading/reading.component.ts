import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {}
