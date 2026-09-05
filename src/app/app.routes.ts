import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostListComponent } from './pages/posts/post-list/post-list.component';
import { PostDetailComponent } from './pages/posts/post-detail/post-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'publicacoes',
    component: PostListComponent,
    title: 'Publicações | LINEART'
  },
  {
    path: 'publicacoes/:id',
    component: PostDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
