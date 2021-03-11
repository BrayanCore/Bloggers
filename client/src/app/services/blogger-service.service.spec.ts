import { TestBed } from '@angular/core/testing';

import { BloggerServiceService } from './blogger-service.service';

describe('BloggerServiceService', () => {
  let service: BloggerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloggerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
