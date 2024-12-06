import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from '../../Common/Constants';
import { CommonService } from '../../Services/common.service';

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
  activeNavLocal = '';

  constructor(private readonly commonService: CommonService) {}
  ngOnInit(): void {
    this.getTemplateNavs();
    this.commonService.templateNavState$.subscribe((navState)=>{
      this.activeNavLocal = navState.toString();
    })
  }

  getTemplateNavs() {
    this.templateNavs = Constants.TEMPLATE_NAVS;
  }

  changeTemplateNav(tempNavs: string) {
    this.commonService.updateTemplateNav(tempNavs.toLowerCase());
  }
}
