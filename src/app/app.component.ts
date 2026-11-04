import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { components } from './app.imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ...components
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lineart-cultural-site';

  constructor(@Inject(PLATFORM_ID) platformId: object, updates: SwUpdate) {
    if (isPlatformBrowser(platformId) && updates.isEnabled) {
      updates.versionUpdates.subscribe(e => {
        if (e.type === 'VERSION_READY') document.location.reload();
      });
    }
  }
}
