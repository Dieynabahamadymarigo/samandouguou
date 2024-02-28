import { TestBed } from '@angular/core/testing';

import { CommandeService } from './commande.service';
import { HttpClientModule } from '@angular/common/http';

describe('CommandeService', () => {
  let service: CommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
