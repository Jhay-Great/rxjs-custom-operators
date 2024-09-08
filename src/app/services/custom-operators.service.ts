import { Injectable } from '@angular/core';
import { map, filter, pipe, Observable, of, from, tap, catchError, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomOperatorsService {
  
  constructor() { }
  
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

  multiplication (number:Observable<number>, factor:Observable<number>): Observable<number> {
    return combineLatest([number, factor]).pipe(
      map(([value1, value2]) => {
        if (typeof value1 !== 'number' || typeof value2 !== 'number') {
          throw new Error(`${value1 || value2} is not a number`);
        }
        return value1 * value2;
      }),
      catchError(error => {
        console.log(error);
        return of(error.message);
      })
    )
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
