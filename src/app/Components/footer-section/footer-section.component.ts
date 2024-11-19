import { Component, OnInit } from '@angular/core';
import { Constants } from '../../Common/Constants';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../Template/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.css',
})
export class FooterSectionComponent implements OnInit {
  appName: string = 'app-name';
  socials: string[] = [];
  footerLinks: string[] = [];
  ngOnInit() {
    this.getAppName();
    this.getSocials();
    this.getFooterLinks();
  }

  getAppName() {
    this.appName = Constants.APP_NAME;
  }

  getSocials() {
    this.socials = Constants.SOCIALS;
  }

  getFooterLinks() {
    this.footerLinks = Constants.FOOTER_LINKS;
  }
}
