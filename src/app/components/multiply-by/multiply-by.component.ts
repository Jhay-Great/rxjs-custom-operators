import { Component, ElementRef, OnInit } from '@angular/core';
// import { CustomOperatorServiceService } from '../../src/app/services/custom-operator.service';
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

  number$!:Observable<number>;
  initialValue$!:Observable<number>;

  constructor (
    private customOperatorService: CustomOperatorsService,
    private elementRef: ElementRef,
  ) {};

  ngOnInit(): void {
    const inputNumber = this.elementRef.nativeElement.querySelector('#number'); // using elementRef to get elements scoped to this component
    const multiplyByFactor = this.elementRef.nativeElement.querySelector('#factor');


    this.initialValue$ = fromEvent<InputEvent>(inputNumber, 'input').pipe(
      debounceTime(500),
      map((event: InputEvent) => { 
        const inputElement = event.target as HTMLInputElement;
        const inputValue = +inputElement.value;
        return inputValue;
      })
    )

    const sourceFactor$ = fromEvent<InputEvent>(multiplyByFactor, 'input').pipe(
      debounceTime(300),
      map((event:InputEvent) => {
        const factorTarget = event.target as HTMLInputElement
        const factor = +factorTarget.value;
        return factor;
      })
    )

    this.number$ = this.customOperatorService.multiplication(this.initialValue$, sourceFactor$);


  }

}
