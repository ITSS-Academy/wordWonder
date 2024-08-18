import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly startDate = new Date(1990, 0, 1);
  profileForm: FormGroup = new FormGroup({
    id: new FormControl(Date.now().toString(), Validators.required),
    name: new FormControl('Phạm Hoàng Long', Validators.required),
    email: new FormControl('phamhoanglong@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl('0123456789', [
      Validators.required,
      //pattern 10 digits
      Validators.pattern('^[0-9]{10}$'),
    ]),
    dob: new FormControl(new Date(), Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {
    this.profileForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        console.log('Profile form value changed:', value);
      });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  goBackToHome(): void {
    this.router.navigate(['/main']).then();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
    }
  }
}
