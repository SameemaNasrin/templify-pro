import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() btnText:string='SIGNUP';
  @Input() type:string='fill';
  @Input() theme:string='light';
  @Input() icon:string='';
  @Input() btnPadding:string='';
  @Input() width:string='';
}
