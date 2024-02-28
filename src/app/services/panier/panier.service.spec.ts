import { TestBed } from '@angular/core/testing';

import { PanierService } from './panier.service';
import { HttpClientModule } from '@angular/common/http';

describe('PanierService', () => {
  let service: PanierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PanierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
