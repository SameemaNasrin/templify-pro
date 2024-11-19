import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-cards.component.html',
  styleUrl: './template-cards.component.css'
})
export class TemplateCardsComponent {
  @Input() template: any;

}
