import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplyByComponent } from './multiply-by.component';

describe('MultiplyByComponent', () => {
  let component: MultiplyByComponent;
  let fixture: ComponentFixture<MultiplyByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplyByComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplyByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
