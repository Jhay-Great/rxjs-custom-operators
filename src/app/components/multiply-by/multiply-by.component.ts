import { Component, ElementRef, OnInit } from '@angular/core';
// import { CustomOperatorService } from '../../src/app/services/custom-operator.service';
import { CustomOperatorsService } from '../../services/custom-operators.service';
import { debounceTime, fromEvent, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multiply-by',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './multiply-by.component.html',
  styleUrl: './multiply-by.component.css'
})
export class MultiplyByComponent implements OnInit {

  number!:Observable<number>;
  initialValue!:Observable<number>;

  constructor (
    private customOperator: CustomOperatorsService,
    private elementRef: ElementRef,
  ) {};

  ngOnInit(): void {
    const inputNumber = this.elementRef.nativeElement.querySelector('#number');
    const multiplyByFactor = this.elementRef.nativeElement.querySelector('#factor');

    

    this.initialValue = fromEvent(inputNumber, 'input').pipe(
      debounceTime(500),
      map(event => { 
        const target = inputNumber.value as HTMLInputElement
        console.log('input value: ', target);
        return +target;
        
      })
    )
    // .subscribe();
    

    const sourceFactor$ = fromEvent(multiplyByFactor, 'input').pipe(
      debounceTime(300),
      map(event => {
        const factorTarget = multiplyByFactor.value as HTMLInputElement
        console.log(factorTarget);
        // factor = factorTarget;
        // return factorTarget;
        
      })
    )
    .subscribe();

    
    // this.number = this.customOperator.byTwo()
    this.number = this.customOperator.product(this.initialValue)
  }

}
