import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolveApiUrl } from './api-url';

export interface PublicServiceModel {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  phone: string;
  instagram: string;
  website: string;
  userName: string;
  userProfession: string;
  userAvatarUrl: string;
  userPhone: string;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private readonly endpoint = `${resolveApiUrl(inject(PLATFORM_ID))}/api/users/services`;

  constructor(private http: HttpClient) {}

  find() {
    return this.http.get<PublicServiceModel[]>(this.endpoint);
  }
}
