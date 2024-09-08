import { Injectable } from '@angular/core';
import { map, filter, pipe, Observable, of, from, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomOperatorsService {

  arr = of(1,'d',3,4,2,5,'a');
  // arr = from([4,2]);

  constructor() { }

  private multiplyBy () {
    return pipe(
      filter((digit:number) => digit % 2 === 0),
      tap(data => {
        console.log(data)
      }),
      map((digit:number) => digit * 2),
      tap(data => console.log(data))
    )
  }

  product () {
    return pipe(
      filter(
        (digit:number) => digit % 2 === 0
      ),
      tap(data => {
        console.log(data);
      })
    )
  }

  multiply (factor:number) {
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

  multipleByTen () {
    return (source$:Observable<number>) => source$.pipe(
      map(data => data * 10),
    );
  }

  // source$ = new Observable<number>(observer => {
  //   next: (value:number) => observer.next(value);
  //   error: (error:string) => observer.error('failed');
  //   complete: () => 'completed';
  // })

  discardOddDoubleEven() {
    return pipe(
      filter((v:number) => !(v % 2)),
      tap(data => {
        console.log(data);
      }),
      map((v) => v + v),
      tap(data => console.log(data))
    );
  }


  byTwo () {
    return this.arr.pipe(
      // this.multiplyBy()
      // this.discardOddDoubleEven(),
      // this.product(),
      // this.multipleByTen(),
      tap(data => {
        console.log(data);
      }),
      this.multiply(3),
      // tap(data => {
      //   console.log('in by two: ', data);
      // }),
      catchError(error => {
        console.log(error);
        return of(error.message);
      })
    )
    // return 
  }
  
  
}
