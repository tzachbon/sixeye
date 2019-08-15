import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObstacleComponent } from './dynamic-obstacle.component';

describe('DynamicObstacleComponent', () => {
  let component: DynamicObstacleComponent;
  let fixture: ComponentFixture<DynamicObstacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicObstacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
