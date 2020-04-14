import { Article } from './../../interfaces/article';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type StorySort = 'publishedAt' | 'popularity';
export type StoryCategory =
  | 'fitness'
  | 'diet'
  | 'exercise'
  | 'health'
  | 'lifestyle';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  constructor(private http: HttpClient) {}

  getStories({
    category,
    limit = 25,
    sortBy = 'publishedAt',
  }: {
    category: string;
    limit?: number;
    sortBy?: string;
  }): Observable<Article[]> {
    return this.http
      .get<Article[]>(
        `http://localhost:4000/api/stories?category=${category}&limit=${limit}&sortBy=${sortBy}`
      )
      .pipe(
        catchError((e) => {
          throw new Error(e.error.msg);
        })
      );
  }
}
