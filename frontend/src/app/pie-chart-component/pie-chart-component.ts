import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartData, PieSlice } from './pie-chart.model';
import { PieChartService } from '../services/pie-chart.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./pie-chart-component.html',
  styleUrls:['./pie-chart-component.css']
})

export class PieChartComponent implements OnChanges {

  @Input() data: PieChartData[] = [];
  @Input() title = '';
  slices: PieSlice[] = [];
  hoveredIndex = -1;

  constructor(private pieChartService:PieChartService) { }
  ngOnChanges(): void {
    this.slices =this.pieChartService.buildSlices(this.data);
  }

  onHover(index: number) {
    this.hoveredIndex = index;
  }

  onLeave() {
    this.hoveredIndex = -1;
  }

  getOpacity(index: number) {

    if (this.hoveredIndex === -1) {
      return 1;
    }

    return this.hoveredIndex === index
      ? 1
      : 0.3;
  }

  get hoveredSlice() {

    if (this.hoveredIndex < 0 ||this.hoveredIndex >= this.slices.length) {
      return null;
    }

    return this.slices[this.hoveredIndex];
  }

  toPct(value: number) {
    return (value * 100).toFixed(1) + '%';
  }
}