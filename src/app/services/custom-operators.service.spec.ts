import { TestBed } from '@angular/core/testing';

import { CustomOperatorsService } from './custom-operators.service';

describe('CustomOperatorsService', () => {
  let service: CustomOperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
