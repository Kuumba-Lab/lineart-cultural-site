import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-mestre-section',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './mestre-section.component.html',
})
export class MestreSectionComponent {}
