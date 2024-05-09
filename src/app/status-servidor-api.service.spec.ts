import { TestBed } from '@angular/core/testing';

import { StatusServidorApiService } from './status-servidor-api.service';

describe('StatusServidorApiService', () => {
  let service: StatusServidorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusServidorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
