import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookCardSkeletonComponent } from './ebook-card-skeleton.component';

describe('EbookCardSkeletonComponent', () => {
  let component: EbookCardSkeletonComponent;
  let fixture: ComponentFixture<EbookCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbookCardSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EbookCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
