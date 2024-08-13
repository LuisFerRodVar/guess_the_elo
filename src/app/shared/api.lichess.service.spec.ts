import { TestBed } from '@angular/core/testing';

import { ApiLichessService } from './api.lichess.service';

describe('ApiLichessService', () => {
  let service: ApiLichessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLichessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
