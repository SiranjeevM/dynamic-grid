export interface PieChartData {
  label: string;
  value: number;
}

export interface PieSlice {
  label: string;
  value: number;
  percentage: number;
  color: string;
  startAngle: number;
  endAngle: number;
  path: string;
}