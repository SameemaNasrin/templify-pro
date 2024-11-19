import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from '../../Common/Constants';

@Component({
  selector: 'app-template-navs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-navs.component.html',
  styleUrl: './template-navs.component.css',
})
export class TemplateNavsComponent implements OnInit {
  public templateNavs: any;
  @Input() marginTop: string = '0vh';
  @Input() theme: string = 'light';
  @Output() activeNav = new EventEmitter<string>();

  activeNavLocal = 'EXPLORE';
  ngOnInit(): void {
    this.getTemplateNavs();
    this.activeNav.emit(this.activeNavLocal);
  }

  getTemplateNavs() {
    this.templateNavs = Constants.TEMPLATE_NAVS;
    console.log(this.templateNavs);
  }

  changeTemplateNav(tempNavs: string) {
    this.activeNavLocal = tempNavs;
    this.activeNav.emit(this.activeNavLocal.toUpperCase());
  }
}
