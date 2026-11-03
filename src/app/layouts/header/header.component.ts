import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    FormsModule,
    RouterModule,
  ],
  styleUrls: []
})
export class HeaderComponent {

  searchTerm = '';

  constructor(private readonly router: Router) { }

  onSearch(event: Event): void {
    event.preventDefault();

    const term = this.searchTerm.trim();
    this.router.navigate(['/publicacoes'], {
      queryParams: term ? { searchTerm: term } : {}
    });
  }
}
