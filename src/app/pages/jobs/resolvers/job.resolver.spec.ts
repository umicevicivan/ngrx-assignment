import { TestBed } from '@angular/core/testing';

import { JobResolver } from './job.resolver.service';

describe('JobResolver', () => {
  let resolver: JobResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
