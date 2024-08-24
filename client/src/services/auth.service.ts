import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrxs/auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {}

  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Error:', { errorCode, errorMessage, email, credential });
        return of(credential);
      }),
    );
  }

  signInWithStaticUser(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Đang xảy ra lỗi`;
    } else {
      // Backend error
      errorMessage = `Đang xảy ra lỗi`;
    }
    return throwError(() => errorMessage);
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        return of(error);
      }),
    );
  }

  isSignedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        observer.next(!!user);
      });
    });
  }

  isStaticUser(): Observable<boolean> {
    return this.store
      .select('auth', 'isStaticUser')
      .pipe(map((staticUser) => !!staticUser));
  }
}
