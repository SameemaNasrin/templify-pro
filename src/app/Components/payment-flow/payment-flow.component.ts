import { Component } from '@angular/core';
import { ButtonComponent } from '../../Template/button/button.component';

@Component({
  selector: 'app-payment-flow',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './payment-flow.component.html',
  styleUrl: './payment-flow.component.css'
})
export class PaymentFlowComponent {

}
