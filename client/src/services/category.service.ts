import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClientAuth} from "../utils/http-client-auth";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClientAuth) {

  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`);
  }
}
