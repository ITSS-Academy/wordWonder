import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserEbooksService {
  constructor(private http: HttpClientAuth) {}

  createUserEbook(userEbook: ProfileModel) {
    return this.http.post(`user-ebooks`, userEbook);
  }

  findListUserHistory() {
    return this.http.get(`user-ebooks/history`);
  }

  findByOne(ebookId: string) {
    return this.http.get(`user-ebooks/one/${ebookId}`);
  }
}
