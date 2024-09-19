import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private scriptLoaded = false;

  loadScript(): void {
    const w: any = window;
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      w['instgrm'].Embeds.process();
    };

    document.body.appendChild(script);
    this.scriptLoaded = true;
  }
}