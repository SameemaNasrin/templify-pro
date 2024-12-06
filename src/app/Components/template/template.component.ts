import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
import { FirebaseService } from '../../Services/firebase.service';
import { CommonService } from '../../Services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class TemplateComponent implements OnInit, OnDestroy {
  filters: any;
  availableTemplates: any[] = [];
  templateType: any;
  constructor(
    private readonly router: Router,
    private readonly firebaseService: FirebaseService,
    private readonly commonService: CommonService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.availableTemplates = [];
    this.getFilters();

    this.commonService.templateNavState$.subscribe((navState) => {
      this.templateType = navState;
      this.getTemplates();
    });
  }

  getFilters() {
    this.filters = Constants.FILTERS;
  }

  getTemplates() {
    if (this.templateType === 'explore') this.getAllTemplates();
    else this.getTemplateByType();
  }

  getAllTemplates() {
    this.availableTemplates = [];

    this.firebaseService.getAllTemplates().subscribe(
      (templates) => {
        this.availableTemplates = templates;
      },
      (err) => {
        this.snackBar.open('Please login to view Templates', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }

  getTemplateByType() {
    this.availableTemplates = [];

    this.firebaseService.getTemplateByType(this.templateType).subscribe({
      next: (templates) => {
        this.availableTemplates = templates;
      },
      error: (err) => {
        console.error('Error fetching templates:', err);
      },
      complete: () => {
        console.log('Template fetching completed.');
      },
    });
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

  ngOnDestroy(): void {
    // this.firebaseService.unsubscribe();
  }
}
