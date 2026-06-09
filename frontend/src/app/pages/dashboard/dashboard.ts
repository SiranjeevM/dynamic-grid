import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter';
import { DynamicGrid } from '../../dynamic-grid/dynamic-grid';
import { PieChartComponent } from "../../pie-chart-component/pie-chart-component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFilterComponent,
    DynamicGrid,
    PieChartComponent
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

  showChart(){
    this.selectedModule='chart';
  }
}