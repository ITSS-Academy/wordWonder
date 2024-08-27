import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from '../ngrxs/auth/auth.reducer';
import { AuthEffects } from '../ngrxs/auth/auth.effects';
import { fileUploadReducer } from '../ngrxs/file-upload/file-upload.reducer';
import { FileUploadEffects } from '../ngrxs/file-upload/file-upload.effects';
import { userReducer } from '../ngrxs/user/user.reducer';
import { UserEffects } from '../ngrxs/user/user.effects';
import { HttpClientAuth } from '../utils/http-client-auth';
import {ebookReducer} from "../ngrxs/ebook/ebook.reducer";
import {EbookEffects} from "../ngrxs/ebook/ebook.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    HttpClientAuth,
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      auth: authReducer,
      file_upload: fileUploadReducer,
      user: userReducer,
      ebook:ebookReducer
    }),
    provideEffects(AuthEffects, FileUploadEffects, UserEffects,EbookEffects),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
};
