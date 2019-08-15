import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraShapeComponent } from './extra-shape.component';

describe('ExtraShapeComponent', () => {
  let component: ExtraShapeComponent;
  let fixture: ComponentFixture<ExtraShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
