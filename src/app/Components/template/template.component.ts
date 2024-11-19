import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TemplateNavsComponent } from '../../Template/template-navs/template-navs.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Constants } from '../../Common/Constants';
import { Templates } from '../../Common/Templates';
import { TemplateCardsComponent } from '../../Template/template-cards/template-cards.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';
import { Router } from '@angular/router';

interface Filters {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    TemplateNavsComponent,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    TemplateCardsComponent,
    FooterSectionComponent,
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
  filters: any;
  availableTemplates: any[] = [];
  templateType: string = 'Landing Page';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getFilters();
    this.getAvailableTemplates();
  }

  getFilters() {
    this.filters = Constants.FILTERS;
  }

  getAvailableTemplates() {
    this.availableTemplates = []; //reset
    for (let template of Templates.AVAILABLE_TEMPLATES) {
      if (
        this.templateType.toLowerCase() === 'explore' ||
        template.templateType.toLowerCase() === this.templateType.toLowerCase()
      )
        this.availableTemplates.push(template);
    }
  }

  navigateToTemplate(templateId: string) {
    this.router.navigate(['/template-desc', this.templateType, templateId]);
  }

  handleNavChange(activeNav: string) {
    this.templateType = activeNav;
    this.getAvailableTemplates();
  }
}
