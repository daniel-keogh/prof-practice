import { Storage } from '@ionic/storage';
import { Article } from './../../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

export type StorySort = 'publishedAt' | 'popularity';
export type StoryCategory =
  | 'fitness'
  | 'diet'
  | 'exercise'
  | 'health'
  | 'lifestyle';

const BLACKLIST_KEY = 'blacklist';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  constructor(private http: HttpClient, private storage: Storage) {}

  getStories({
    category = 'fitness',
    limit = 25,
    sortBy = 'publishedAt',
  }: {
    category?: StoryCategory;
    limit?: number;
    sortBy?: StorySort;
  }): Observable<Article[]> {
    return from(this.getBlackListedDomains()).pipe(
      flatMap((blacklist) => {
        return this.http
          .get<Article[]>(
            `http://localhost:4000/api/stories?category=${category}&limit=${limit}&sortBy=${sortBy}&excludeDomains=${blacklist}`
          )
          .pipe(
            catchError((e) => {
              throw new Error(e.error.msg);
            })
          );
      })
    );
  }

  async getBlackListedDomains(): Promise<string> {
    // Read the list from storage
    const data: string[] = await this.storage.get(BLACKLIST_KEY);

    if (data && data.length > 0) {
      // return comma separated list
      return data.join(',');
    } else {
      return '';
    }
  }

  async addBlacklistedDomain(url: string): Promise<string[]> {
    let host = new URL(url).hostname;

    if (url.split('.').length > 2) {
      // Remove any subdomains
      host = new URL(url).hostname.replace(/^[^.]+\./g, '');
    }

    let data: string[] = await this.storage.get(BLACKLIST_KEY);

    if (data && data.length > 0) {
      data.push(host);
    } else {
      data = [host];
    }

    // Remove duplicates using a Set & then save to local storage
    return this.storage.set(BLACKLIST_KEY, [...new Set(data)]);
  }
}
