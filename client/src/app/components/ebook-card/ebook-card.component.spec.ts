import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookCardComponent } from './ebook-card.component';

describe('EbookCardComponent', () => {
  let component: EbookCardComponent;
  let fixture: ComponentFixture<EbookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
