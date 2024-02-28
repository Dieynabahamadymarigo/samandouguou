import { TestBed } from '@angular/core/testing';

import { PacksService } from './packs.service';
import { HttpClientModule } from '@angular/common/http';

describe('PacksService', () => {
  let service: PacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
