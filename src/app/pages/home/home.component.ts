import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '../../components/banner/banner.component';
import { PostsSectionComponent } from '../../components/posts-section/posts-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    BannerComponent,
    PostsSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
