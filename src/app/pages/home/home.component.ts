import { afterRender, Component } from '@angular/core';
import { InstagramService } from '../../services/instagram.service';
import { BannerComponent } from "../../components/banner/banner.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private readonly instagramService: InstagramService,) {
    afterRender(() => {
      this.instagramService.loadScript();
    });
  }
}
