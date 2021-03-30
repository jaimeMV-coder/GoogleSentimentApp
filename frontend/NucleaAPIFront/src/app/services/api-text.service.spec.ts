import { TestBed } from '@angular/core/testing';

import { ApiTextService } from './api-text.service';

describe('ApiTextService', () => {
  let service: ApiTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
