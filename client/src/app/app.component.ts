import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
