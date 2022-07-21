import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTemplateComponent } from './index-template.component';

describe('IndexTemplateComponent', () => {
  let component: IndexTemplateComponent;
  let fixture: ComponentFixture<IndexTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
