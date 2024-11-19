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
import { FirebaseService } from '../../Services/FirebaseService';

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
  providers: [FirebaseService],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
  filters: any;
  availableTemplates: any[] = [];
  templateType: string = 'explore';
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.availableTemplates = [];
    this.getFilters();
    // this.getAvailableTemplates();

    if (history.state.templateType != undefined)
      this.templateType = (history.state.templateType).toLowerCase();
    else this.templateType = 'explore';

    this.handleNavChange(this.templateType);
    // this.getTemplatesFromDB();
  }

  getFilters() {
    this.filters = Constants.FILTERS;
  }

  async getTemplatesFromDB() {
    this.availableTemplates = []; //reset
    const templates = await this.firebaseService.getTemplateByType(
      this.templateType
    );
    this.availableTemplates.push(...templates);
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

  navigateToTemplate(template: string) {
    this.router.navigate(['/template-desc'], {
      state: { template: template },
    });
  }

  handleNavChange(activeNav: string) {
    this.templateType = activeNav;
    this.getTemplatesFromDB();
    // this.getAvailableTemplates(); test function
  }
}
