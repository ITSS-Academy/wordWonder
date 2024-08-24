import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrxs/auth/auth.state';
import * as AuthActions from '../ngrxs/auth/auth.actions';
import * as UserActions from '../ngrxs/user/user.actions';
import { UserState } from '../ngrxs/user/user.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'wordWonder';

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        this.store.dispatch(AuthActions.storeIdToken({ idToken: token.token }));
      }
    });
    // console.log(this.get('idToken'));
    if (this.get('idToken') != '') {
      this.store.dispatch(
        AuthActions.toggleStaticUserMode({ isStaticUser: true }),
      );
      this.store.dispatch(
        AuthActions.storeIdToken({ idToken: this.get('idToken') }),
      );
    }
  }

  ngOnInit(): void {
    this.store.select('auth', 'idToken').subscribe((val) => {
      if (val != '') {
        this.store.dispatch(UserActions.getById());
      }
    });
    this.store.select('user', 'loadingError').subscribe((val) => {
      if (val == 'User not found') {
        this.store.dispatch(UserActions.create());
      }
    });
    this.store.select('user', 'isCreatedSuccess').subscribe((val) => {
      if (val) {
        this.store.dispatch(UserActions.getById());
      }
    });
  }

  get(key: string) {
    return sessionStorage.getItem(key) || '';
  }
}
