import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter';
import { DynamicGrid } from '../../dynamic-grid/dynamic-grid';
import { PieChartComponent } from '../../pie-chart-component/pie-chart-component';

import { ChartService } from '../../services/chart.service';
import { TreeViewComponent } from '../../tree-view/tree-view';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFilterComponent,
    DynamicGrid,
    PieChartComponent,
    TreeViewComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  selectedModule = 'filter';
  summary: any = {};
  selectedStudent: any = null;

  departmentData: any[] = [];

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {

    this.loadChartData();

  }

  loadChartData() {

    this.chartService
      .getDepartmentCount()
      .subscribe({
        next: (result) => {

          console.log(result);

          this.departmentData = result;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  showFilter() {
    this.selectedModule = 'filter';
  }

  showSorting() {
    this.selectedModule = 'sorting';
  }

  showChart() {

    this.selectedModule = 'chart';

    this.chartService
      .getDepartmentCount()
      .subscribe(result => {

        this.departmentData = result;

      });

    this.chartService
      .getSummary()
      .subscribe(result => {

        this.summary = result;

      });
  }
}
