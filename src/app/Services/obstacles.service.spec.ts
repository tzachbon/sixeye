import { TestBed } from '@angular/core/testing';

import { ObstaclesService } from './obstacles.service';

describe('ObstaclesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObstaclesService = TestBed.get(ObstaclesService);
    expect(service).toBeTruthy();
  });
});
