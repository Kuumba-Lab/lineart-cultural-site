export interface AuthorModel {
  id: string;
  name: string;
  codename?: string;
  avatar?: string | null;
}

export interface TagModel {
  id: string;
  name: string;
}

export interface PostModel {
  id: string;
  title: string;
  content: string;
  cover?: string | null;
  coverOriginal?: string | null;
  coverId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  authors: AuthorModel[];
  tags: TagModel[];
  event?: any;
}

export interface PagedModel<T> {
  content: T[];
  count: number;
  page: number;
  size: number;
}
