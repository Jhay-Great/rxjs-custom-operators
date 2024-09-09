import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { of, filter, map } from 'rxjs';

import { CustomOperatorsService } from './custom-operators.service';

describe('CustomOperatorsService', () => {
  let service: CustomOperatorsService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomOperatorsService],
    });
    service = TestBed.inject(CustomOperatorsService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiple input value by the factor using the combineLatest operator', () => {
    testScheduler.run(({cold, expectObservable}) => {
      const input$ = cold(' -a|', {a: 23});
      const factor$ = cold(' -b|', {b: 2});

      const result$ = service.multiplication(input$, factor$);

      const expected = '  -c|';
      const expectValue = {c: 46};
 
      expectObservable(result$).toBe(expected, expectValue)
    })
  }); 

  it('should multiply the source by a factor', () => {
    testScheduler.run(({cold, expectObservable}) => {
      const source$ = cold('-a|', {a: 2});
      const factor = 2;

      // const result$ = service.product(source$, factor);
      const result$ = service.multiplyByFactor(source$, factor);

      const expect = ' -b|';
      const expectedValue = {b: 4};

      expectObservable(result$).toBe(expect, expectedValue);

    })
  })

  it('should multiple each number by the factor', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('-a-b-c|', {a:1, b:2, c:3});
      const factor = 2;

      // const result$ = source$.pipe(service.multiply(2));
      const result$ = service.product(source$, factor);

      const expect = '  -d-e-f|';
      const expectedValue = {d:[2], e:[2,4], f:[2,4,6]};

      expectObservable(result$).toBe(expect, expectedValue);
    })
  })
  
  
});



