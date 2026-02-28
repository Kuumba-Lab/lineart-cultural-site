import { afterRender, Component } from '@angular/core';
import { InstagramService } from '../../services/instagram.service';
import { BannerComponent } from '../../components/banner/banner.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { MestreSectionComponent } from '../../components/mestre-section/mestre-section.component';
import { InstagramSectionComponent } from '../../components/instagram-section/instagram-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    AboutSectionComponent,
    MestreSectionComponent,
    InstagramSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private readonly instagramService: InstagramService,) {
    afterRender(() => {
      this.instagramService.loadScript();
    });
  }
}
