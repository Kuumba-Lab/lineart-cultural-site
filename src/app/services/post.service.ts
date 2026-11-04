import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagedModel, PostModel } from '../models/post.model';
import { resolveApiUrl } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly endpoint = `${resolveApiUrl(inject(PLATFORM_ID))}/api/posts`;

  constructor(private readonly http: HttpClient) { }

  findPaged(params: any) {
    return this.http.get<PagedModel<PostModel>>(this.endpoint, { params });
  }

  findById(id: string) {
    return this.http.get<PostModel>(`${this.endpoint}/${id}`);
  }
}
