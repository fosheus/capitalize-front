import { TestBed } from '@angular/core/testing';

import { CheckValueService } from './check-value.service';

describe('CheckValueService', () => {
  let service: CheckValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
