import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../Template/page-header/page-header.component';
import { Constants } from '../../Common/Constants';
import { ButtonComponent } from '../../Template/button/button.component';
import { ProjectTemplatesComponent } from '../../Template/project-templates/project-templates.component';
import { CommonModule } from '@angular/common';
import { FaqComponent } from '../../Template/faq/faq.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';
import { TemplateNavsComponent } from '../../Template/template-navs/template-navs.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ButtonComponent,
    ProjectTemplatesComponent,
    CommonModule,
    FaqComponent,
    FooterSectionComponent,
    TemplateNavsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public headingTemplates: any;
  public readonly browseLibraryTxt = 'BROWSE LIBRARY';

  public projects: string[] = [];
  public templates: string[] = [];
  public serviceTags: any = [];
  public templateIncludes: string[] = [];

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.getHeadingTemplates();
    this.getProjects();
    this.getTemplates();
    this.getServiceTags();
    this.getTemplateIncludes();
  }

  getHeadingTemplates() {
    this.headingTemplates = Constants.HEADING_TEMPLATES;
  }

  getProjects() {
    this.projects = Constants.PROJECTS;
  }

  getTemplates() {
    this.templates = Constants.TEMPLATES;
  }

  getServiceTags() {
    this.serviceTags = Constants.SERVICE_TAGS;
  }

  getTemplateIncludes() {
    this.templateIncludes = Constants.TEMPLATES_INCLUDES;
  }

  browseLibrary(){
    this.router.navigate(['/template']);

  }
}
