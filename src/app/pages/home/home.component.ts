import { afterRender, Component } from '@angular/core';
import { InstagramService } from '../../services/instagram.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private readonly instagramService: InstagramService,) {
    afterRender(() => {
      this.instagramService.loadScript();
    });
  }
}
