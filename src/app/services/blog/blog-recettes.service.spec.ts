import { TestBed } from '@angular/core/testing';

import { BlogRecettesService } from './blog-recettes.service';
import { HttpClientModule } from '@angular/common/http';

describe('BlogRecettesService', () => {
  let service: BlogRecettesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],

    });
    service = TestBed.inject(BlogRecettesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
