import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticStationComponent } from './static-station.component';

describe('StaticStationComponent', () => {
  let component: StaticStationComponent;
  let fixture: ComponentFixture<StaticStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
