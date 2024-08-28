import { Component, Input, OnInit, signal } from '@angular/core';
import { EBookModel } from '../../../models/ebook.model';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { EbookCardSkeletonComponent } from '../ebook-card-skeleton/ebook-card-skeleton.component';
import { JWTTokenService } from '../../../services/jwttoken.service';
import { Router } from '@angular/router';

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

  constructor(
    private jwtTokenService: JWTTokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  navigateToDetail(url: string, id: string) {
    if (this.jwtTokenService.jwtToken != '') {
      this.jwtTokenService.checkTokenExpired();
      if (this.jwtTokenService.isTokenExpired()) {
        return;
      }
    }
    this.router.navigate([url, id]).then();
  }
}
