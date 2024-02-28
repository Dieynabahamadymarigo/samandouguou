import { TestBed } from '@angular/core/testing';

import { GuardService } from './guard.service';
import { HttpClientModule } from '@angular/common/http';

describe('GuardService', () => {
  let service: GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
