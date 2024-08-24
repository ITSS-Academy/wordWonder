import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClientAuth) {}

  create() {
    return this.http.post(`${environment.apiUrl}/users`, '');
  }
}
