export interface AuthorModel {
  id: string;
  name: string;
  codename?: string;
  avatar?: string;
}

export interface TagModel {
  id: string;
  name: string;
}

export interface PostModel {
  id: string;
  title: string;
  content: string;
  cover?: string;
  coverOriginal?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  authors: AuthorModel[];
  tags: TagModel[];
  event?: { id: string; name: string };
}

export interface PagedModel<T> {
  content: T[];
  count: number;
  page: number;
  size: number;
}

export interface PostFilters {
  page: number;
  size: number;
  searchTerm: string;
  tag: string;
  author: string;
}
