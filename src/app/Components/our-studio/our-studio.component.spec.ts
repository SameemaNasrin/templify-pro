import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurStudioComponent } from './our-studio.component';

describe('OurStudioComponent', () => {
  let component: OurStudioComponent;
  let fixture: ComponentFixture<OurStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurStudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
