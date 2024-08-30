import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookContentFormDialogComponent } from './ebook-content-form-dialog.component';

describe('EbookContentFormDialogComponent', () => {
  let component: EbookContentFormDialogComponent;
  let fixture: ComponentFixture<EbookContentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbookContentFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbookContentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
