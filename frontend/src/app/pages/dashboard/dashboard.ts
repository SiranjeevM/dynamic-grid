import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter';
import { DynamicGrid } from '../../dynamic-grid/dynamic-grid';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFilterComponent,
    DynamicGrid
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  selectedModule = 'filter';

  showFilter() {
    this.selectedModule = 'filter';
  }

  showSorting() {
    this.selectedModule = 'sorting';
  }
}