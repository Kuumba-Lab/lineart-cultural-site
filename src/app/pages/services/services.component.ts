import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { ServicesService, PublicServiceModel } from '../../services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  services: PublicServiceModel[] = [];
  loading = true;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.find().pipe(take(1)).subscribe({
      next: (l: PublicServiceModel[]) => { this.services = l ?? []; this.loading = false; },
      error: () => this.loading = false
    });
  }

  whatsapp(phone: string): string {
    return 'https://wa.me/' + (phone ?? '').replace(/\D/g, '');
  }

  instagramUrl(ig: string): string {
    if (!ig) return '';
    return ig.startsWith('http') ? ig : 'https://instagram.com/' + ig.replace(/^@/, '');
  }
}
