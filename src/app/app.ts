import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicGrid } from "./dynamic-grid/dynamic-grid";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DynamicGrid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dynamic-grid-sorting');
}
