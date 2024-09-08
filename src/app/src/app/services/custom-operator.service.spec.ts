import { TestBed } from '@angular/core/testing';

import { CustomOperatorService } from './custom-operator.service';

describe('CustomOperatorService', () => {
  let service: CustomOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
