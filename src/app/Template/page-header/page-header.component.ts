import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: any;
  @Input() headingText: any;
  @Input() subHeadingText: any;
  @Input() theme: string = 'light';
  @Input() fontWeight: string = '500';
  ngOnInit(): void {}
}
