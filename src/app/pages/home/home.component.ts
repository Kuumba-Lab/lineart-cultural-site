import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { MestreSectionComponent } from '../../components/mestre-section/mestre-section.component';
import { PostsSectionComponent } from '../../components/posts-section/posts-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    AboutSectionComponent,
    MestreSectionComponent,
    PostsSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
