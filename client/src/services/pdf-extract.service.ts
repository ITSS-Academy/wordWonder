import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PdfExtractService {
  constructor(private http: HttpClientAuth) {}

  extract(fileUrl: string) {
    return this.http.get(`${environment.extractUrl}?fileUrl=${fileUrl}`);
  }
}
