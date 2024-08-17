import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { AuthService } from '../services/auth.service';
import { EbookService } from '../services/ebook.service';

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
  constructor(
    public authService: AuthService,
    public EbookService: EbookService,
  ) {}
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
