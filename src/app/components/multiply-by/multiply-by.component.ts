import { Component, OnInit } from '@angular/core';
// import { CustomOperatorService } from '../../src/app/services/custom-operator.service';
import { CustomOperatorsService } from '../../services/custom-operators.service';
import { Observable } from 'rxjs';
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

  constructor (
    private customOperator: CustomOperatorsService,
  ) {};

  ngOnInit(): void {
    this.number = this.customOperator.byTwo()
  }

}
