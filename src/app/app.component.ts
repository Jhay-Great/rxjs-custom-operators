import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiplyByComponent } from './components/multiply-by/multiply-by.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MultiplyByComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-custom-operator';
}
