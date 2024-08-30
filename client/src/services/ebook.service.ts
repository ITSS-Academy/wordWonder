import { Injectable } from '@angular/core';
import { EBookModel, GENRES } from '../models/ebook.model';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  constructor(private http: HttpClientAuth) {}

  //findAll
  getEbookLists() {
    return this.http.get('ebooks');
  }

  //findOne
  getEbookDetail(id: string, lastSection: number) {
    if (lastSection == 0) {
      return this.http.get(`ebooks/one/${id}`);
    } else {
      return this.http.get(`ebooks/one/${id}?lastSection=${lastSection}`);
    }
  }

  //add new book
  addEbook(ebook: EBookModel) {
    return this.http.post('ebooks', ebook);
  }

  //update book
  updateEbook(ebook: EBookModel, isUpdateContent: boolean) {
    return this.http.patch(
      `ebooks/one/${ebook.id}?isUpdateContent=${isUpdateContent}`,
      ebook,
    );
  }

  //trend
  listTrendEbooks(limit: number) {
    return this.http.get('ebooks/trend?limit=' + limit);
  }

  //find by rating
  getEbookByRating(limit: number) {
    return this.http.get('ebooks/rating?limit=' + limit);
  }

  //view
  increaseView(id: string) {
    return this.http.patch('ebooks/view/' + id, {});
  }

  //increase view
  like(id: string) {
    return this.http.patch(`ebooks/like/${id}`, {});
  }

  //decrease view
  disLike(id: string) {
    return this.http.patch(`ebooks/dislike/${id}`, {});
  }

  //find by recommend
  getRecommendEbooks(limit: number) {
    return this.http.get(`ebooks/recommend?limit=${limit}`);
  }
}
