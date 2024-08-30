import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  isLoadingSignIn = false;

  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private _matSnackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'loading').subscribe((loading) => {
        this.isLoadingSignIn = loading;
      }),
      this.store.select('auth', 'idToken').subscribe((val) => {
        if (val != '') {
          this.router.navigate(['/main']).then(() => {
            //console.log('tic');
          });
        }
      }),
      this.store.select('auth', 'error').subscribe((error) => {
        if (error) {
          //console.log('Error:', error);
          this._matSnackBar.open(error, 'Đóng', {
            duration: 5000,
          });
        }
      }),
    );
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  signInWithStaticUser() {
    this.store.dispatch(
      AuthActions.signInWithStaticUser({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }),
    );
  }
}
