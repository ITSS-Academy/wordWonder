import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { AuthState } from '../../../ngrxs/auth/auth.state';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
