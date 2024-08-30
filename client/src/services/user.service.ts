import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClientAuth) {}

  create() {
    return this.http.post(`users`, '');
  }

  update(updateUserDto: ProfileModel) {
    return this.http.patch(`users`, updateUserDto);
  }

  getById() {
    return this.http.get(`users`);
  }
}
