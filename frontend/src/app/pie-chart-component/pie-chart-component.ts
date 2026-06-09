import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { ChartService } from '../services/chart.service';
 
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart-component.html',
  styleUrls: ['./pie-chart-component.css']
})
export class PieChartComponent implements OnInit {
 
  chartData: any[] = [];
 
  constructor(private chartService: ChartService) {}
 
  ngOnInit(): void {
 
    this.chartService.getDepartmentChart().subscribe(result => {
        this.chartData = result;
      });
  }
}
 