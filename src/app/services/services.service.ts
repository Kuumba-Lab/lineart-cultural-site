import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appEnv } from '../../env';

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
  private readonly endpoint = `${appEnv.apiUrl}/api/users/services`;

  constructor(private http: HttpClient) {}

  find() {
    return this.http.get<PublicServiceModel[]>(this.endpoint);
  }
}
