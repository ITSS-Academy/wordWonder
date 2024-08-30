import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PdfExtractService {
  constructor(private http: HttpClient) {}

  extract(fileUrl: string) {
    return this.http.post(
      `${environment.extractUrl}`,
      {
        url: fileUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
