import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'templify-pro';
  noNavBarComponents: string[] = ['/signup', '/login', '/payment-flow'];
  constructor(public router: Router) {}

  // generate admin page to add template and use this function
  // addTemplate() {
  //   const template = {
  //     templateId: 7,
  //     templateType: 'DUMMY',
  //     templateName: 'Template name here',
  //     tempaltePrice: '$12',
  //     templateImage: '../../../assets/templateImage.svg',
  //     templateBgImage: '../../../assets/templateBgImage.svg',
  //     templateDesc:
  //       'Agentic – a responsive, minimalist design with dynamic animation effects, ideal for agencies, portfolios, or personal use. Showcase your work seamlessly with a sleek aesthetic that adapts flawlessly across devices.',
  //     templateInfo: ['5 Pages', 'CODEBASE'],
  //     templatePrice: '$69.00',
  //     whatsIncluded: {
  //       desc: 'Your website is 90% done before you even start. I’ve spent hours designing so you don’t have to—just swap out the colors and images, add your written content, and make any final tweaks.',
  //       pages: [
  //         'Home page',
  //         'Home page',
  //         'Home page',
  //         'Home page',
  //         'Home page',
  //       ],
  //       prosList: [
  //         'Customizable Layouts',
  //         'Responsive Design',
  //         'HTML, CSS, and JS files',
  //         'Quick Download & Access',
  //         'No-Code Options',
  //         'Built-in Animations',
  //         'Documentation & Setup Guides',
  //       ],
  //     }
  //   };
  //   this.firebaseService.addNewTemplate(template);
  // }

  // fetchTemplate(){
  //   this.firebaseService.getTemplateById(1);

  // }
}
