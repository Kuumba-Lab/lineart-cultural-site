import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appEnv } from '../../env';
import { AuthorModel, PagedModel, PostFilters, PostModel, TagModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = `${appEnv.apiUrl}/api`;

  constructor(private readonly http: HttpClient) { }

  findPaged(filters: PostFilters): Observable<PagedModel<PostModel>> {
    let params = new HttpParams()
      .set('page', filters.page)
      .set('size', filters.size);

    if (filters.searchTerm) params = params.set('searchTerm', filters.searchTerm);
    if (filters.tag) params = params.set('tag', filters.tag);
    if (filters.author) params = params.set('author', filters.author);

    return this.http.get<PagedModel<PostModel>>(`${this.baseUrl}/posts`, { params });
  }

  findById(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.baseUrl}/posts/${id}`);
  }

  findTags(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>(`${this.baseUrl}/tags`);
  }

  findAuthors(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(`${this.baseUrl}/users/authors`);
  }
}
