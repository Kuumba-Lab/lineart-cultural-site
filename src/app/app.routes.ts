import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { ServicesComponent } from './pages/services/services.component';
import { PostDetailComponent } from './pages/posts/post-detail/post-detail.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { MestreSectionComponent } from './components/mestre-section/mestre-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sobre',
    component: AboutSectionComponent
  },
  {
    path: 'mestre',
    component: MestreSectionComponent
  },
  {
    path: 'contato',
    component: ContactSectionComponent
  },
  {
    path: 'servicos',
    component: ServicesComponent
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
