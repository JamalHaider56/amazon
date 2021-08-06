import { TestBed } from '@angular/core/testing';

import { CommonSeriveService } from './common-serive.service';

describe('CommonSeriveService', () => {
  let service: CommonSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
