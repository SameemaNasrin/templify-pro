import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../../Common/Constants';
import { ButtonComponent } from '../../Template/button/button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  navs: any;
  darkThemeRouters = ['/template', '/get-in-touch', '/template-desc'];
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.getNavs();
  }

  getNavs() {
    this.navs = Constants.NAVS;
  }

  navigate(routeUrl: string) {
    this.router.navigate([routeUrl]);
  }
}
