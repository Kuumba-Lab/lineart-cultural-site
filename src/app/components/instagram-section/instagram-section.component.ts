import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-instagram-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-section.component.html',
  styleUrl: './instagram-section.component.css'
})
export class InstagramSectionComponent {
  posts: Array<{ permalink: string; caption: string }> = [
    {
      permalink: 'https://www.instagram.com/reel/C423wQarB0z/?utm_source=ig_embed&utm_campaign=loading',
      caption: 'Uma publicação compartilhada por Neto Siqueira'
    },
    {
      permalink: 'https://www.instagram.com/reel/C5whZ1cL7As/?utm_source=ig_embed&utm_campaign=loading',
      caption: 'Uma publicação compartilhada por Neto Siqueira'
    },
    {
      permalink: 'https://www.instagram.com/p/C-6DOmzSs9R/?utm_source=ig_embed&utm_campaign=loading',
      caption: 'Uma publicação compartilhada por Negra Luz'
    }
  ];
}
