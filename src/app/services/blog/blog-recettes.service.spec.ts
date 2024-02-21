import { TestBed } from '@angular/core/testing';

import { BlogRecettesService } from './blog-recettes.service';

describe('BlogRecettesService', () => {
  let service: BlogRecettesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogRecettesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
