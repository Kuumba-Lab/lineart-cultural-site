import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig, NguCarouselDefDirective, NguCarouselNextDirective, NguCarouselPrevDirective, NguItemComponent } from '@ngu/carousel';
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    NguCarousel,
    NguItemComponent,
    NguCarouselDefDirective,
    NguCarouselNextDirective,
    NguCarouselPrevDirective,
],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  @Input() images: string[] = [];

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: { timing: 3000, initialDelay: 500 },
    loop: true,
    touch: true,
    velocity: 0.05,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    point: {
      visible: true
    },
    custom: 'banner'
  };

}

