import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
