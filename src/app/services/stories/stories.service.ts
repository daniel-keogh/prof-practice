import { Article } from './../../interfaces/article';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  constructor(private http: HttpClient) {}

  getStories(category: string, limit: number = 25): Observable<Article[]> {
    return this.http
      .get<Article[]>(
        `http://localhost:4000/api/stories?category=${category}&limit=${limit}`
      )
      .pipe(
        catchError((e) => {
          throw new Error(e.error.msg);
        })
      );
  }
}
