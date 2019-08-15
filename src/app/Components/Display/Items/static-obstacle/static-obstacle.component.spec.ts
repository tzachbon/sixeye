import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticObstacleComponent } from './static-obstacle.component';

describe('StaticObstacleComponent', () => {
  let component: StaticObstacleComponent;
  let fixture: ComponentFixture<StaticObstacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticObstacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
