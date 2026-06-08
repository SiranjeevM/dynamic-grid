import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicGrid } from "./dynamic-grid/dynamic-grid";
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter';
import { Dashboard } from './pages/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dynamic-grid-sorting');
}
