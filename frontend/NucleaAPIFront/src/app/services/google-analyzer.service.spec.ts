import { TestBed } from '@angular/core/testing';

import { GoogleAnalyzerService } from './google-analyzer.service';

describe('GoogleAnalyzerService', () => {
  let service: GoogleAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
