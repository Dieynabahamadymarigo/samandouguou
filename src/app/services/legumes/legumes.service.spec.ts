import { TestBed } from '@angular/core/testing';

import { LegumesService } from './legumes.service';
import { HttpClientModule } from '@angular/common/http';

describe('LegumesService', () => {
  let service: LegumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LegumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
