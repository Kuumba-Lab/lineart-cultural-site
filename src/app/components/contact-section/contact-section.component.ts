import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, BannerComponent, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  private readonly whatsappPhone = '557991469391';
  readonly contactForm;

  constructor(private readonly formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    const name = this.contactForm.controls.name.value?.trim() ?? '';
    const message = this.contactForm.controls.message.value?.trim() ?? '';

    const text = `Olá Mestre O Formiga, me chamo ${name}.\n${message}`;
    const whatsappUrl = `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
