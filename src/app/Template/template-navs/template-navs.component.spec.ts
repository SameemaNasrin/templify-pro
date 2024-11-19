import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNavsComponent } from './template-navs.component';

describe('TemplateNavsComponent', () => {
  let component: TemplateNavsComponent;
  let fixture: ComponentFixture<TemplateNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateNavsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
