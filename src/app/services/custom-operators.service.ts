import { Injectable } from '@angular/core';
import { map, filter, pipe, Observable, of, from, tap, catchError, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomOperatorsService {
  
  constructor() { }
  
  multiplication (number:Observable<any>, factor:Observable<any>): Observable<number> {
    return combineLatest([number, factor]).pipe(
      tap(data => {
        // console.log(data);
      }),
      map(([value1, value2]) => {
        const number = Number(value1);  // Ensure both values are converted to numbers
      const factor = Number(value2);
        console.log(typeof value1, value2)
        // if (typeof value1 !== 'number' || typeof value2 !== 'number') {
        if (isNaN(number)) {
          throw new Error(`${value1} is not a number`);
        }
        if (isNaN(factor)) {
          throw new Error(`${value2} is not a number`);

        }
        return number * factor;
      }),
      catchError(error => {
        console.log(error);
        return of(error.message);
      })
    )
  }

  multiplyByFactor (source$:Observable<any>, factor:number) {
    return source$.pipe(
      filter(
        value => typeof value === 'number',
      ),
      map(
        value => value * factor,
      ),
      tap(data => {
        console.log('logging value: ', data);
      })
    )
  }


  private multiply (factor:number) {
    return (source$:Observable<any>) => new Observable<any>((observer) => {
      let accumulated:number[] = [];
      const subscription = source$.subscribe({
        next: (value) => {
          if (typeof value !== 'number') observer.error(new Error(`Invalid value: ${value} is not a number`)) ;
          const data = factor * value;
          accumulated = [...accumulated, data];
          return observer.next(accumulated)
          // return observer.next(data)
        },
        error: error => observer.error(error.message),
        complete: () => observer.complete(),
      })

      return subscription;
      
    })
  }

  product (source$:Observable<any>, factor=3) {
    return source$.pipe(
      tap(data => {
        console.log('source data: ', data);
      }),
      this.multiply(factor),
    )
  }


  
  
}
