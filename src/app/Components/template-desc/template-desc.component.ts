import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Templates } from '../../Common/Templates';
import { ButtonComponent } from '../../Template/button/button.component';
import { PageHeaderComponent } from '../../Template/page-header/page-header.component';
import { Constants } from '../../Common/Constants';
import { TemplateCardsComponent } from '../../Template/template-cards/template-cards.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';

@Component({
  selector: 'app-template-desc',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    PageHeaderComponent,
    TemplateCardsComponent,
    FooterSectionComponent,
  ],
  templateUrl: './template-desc.component.html',
  styleUrl: './template-desc.component.css',
})
export class TemplateDescComponent implements OnInit {
  template: any;
  headingTemplates: any;
  similarTemplates: any;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.getTemplate();
    this.getHeadingTemplates();
    this.getSimilarTemplates();
  }

  async getTemplate() {
    this.template = history.state.template;
    console.log(this.template);
    //   this.template = Templates.AVAILABLE_TEMPLATES.find(template => template == this.id);
  }

  getHeadingTemplates() {
    this.headingTemplates = Constants.HEADING_TEMPLATES;
  }

  getSimilarTemplates() {
    this.similarTemplates = Templates.AVAILABLE_TEMPLATES;
  }

  navigateToTemplate(templateId: string, templateType: string) {
    this.router.navigate(['/template-desc', templateType, templateId]);
  }

  // need to modify this function to navigate based on template type
  navigateBack(templateType: string) {
    this.router.navigate(['/template'], {
      state: { templateType: templateType },
    });
  }

  browseLibrary() {
    this.router.navigate(['/template']);
  }

  navigate(navigateUrl: string) {
    this.router.navigate([navigateUrl]);
  }
}
