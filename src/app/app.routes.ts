import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { PostDetailComponent } from './pages/posts/post-detail/post-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'publicacoes',
    component: PostsListComponent
  },
  {
    path: 'publicacoes/:id',
    component: PostDetailComponent
  }
];
