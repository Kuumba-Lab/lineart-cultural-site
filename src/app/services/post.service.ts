import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appEnv } from '../../env';
import { PagedModel, PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly endpoint = `${appEnv.apiUrl}/api/posts`;

  constructor(private readonly http: HttpClient) { }

  findPaged(params: any) {
    return this.http.get<PagedModel<PostModel>>(this.endpoint, { params });
  }

  findById(id: string) {
    return this.http.get<PostModel>(`${this.endpoint}/${id}`);
  }
}
