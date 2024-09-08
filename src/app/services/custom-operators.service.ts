import { Injectable } from '@angular/core';
import { map, filter, pipe, Observable, of, from, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomOperatorsService {

  // arr = of(1,3,4,2,5,'a');
  // arr = from([4,2]);

  constructor() { }

  // private multiplyBy () {
  //   return pipe(
  //     filter((digit:number) => digit % 2 === 0),
  //     tap(data => {
  //       console.log(data)
  //     }),
  //     map((digit:number) => digit * 2),
  //     tap(data => console.log(data))
  //   )
  // }

  // product () {
  //   return pipe(
  //     filter(
  //       (digit:number) => digit % 2 === 0
  //     ),
  //     tap(data => {
  //       console.log(data);
  //     })
  //   )
  // }

  private multiply (factor:number) {
    return (source$:Observable<any>) => new Observable<any>((observer) => {
      // next: (value <T>) => observer.next(value);
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


  // byTwo () {
  //   return this.arr.pipe(
  //     // this.multiplyBy()
  //     // this.discardOddDoubleEven(),
  //     // this.product(),
  //     // this.multipleByTen(),
  //     tap(data => {
  //       console.log(data);
  //     }),
  //     this.multiply(3),
  //     // tap(data => {
  //     //   console.log('in by two: ', data);
  //     // }),
  //     catchError(error => {
  //       console.log(error);
  //       return of(error.message);
  //     })
  //   )
  //   // return 
  // }
  
  
}
