import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  apiUrl = "http://localhost:8080/articles"

  constructor(private http: HttpClient) { }

  getArticles() : Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticleContent(id: string) : Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`)
  }
}
