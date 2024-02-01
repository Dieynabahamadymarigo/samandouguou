import { TestBed } from '@angular/core/testing';

import { LegumesService } from './legumes.service';

describe('LegumesService', () => {
  let service: LegumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
