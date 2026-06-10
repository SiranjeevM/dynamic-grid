import { Injectable } from '@angular/core';
import { PieChartData, PieSlice } from '../pie-chart-component/pie-chart.model';

const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40'
];

@Injectable({
    providedIn: 'root'
})
export class PieChartService {

    getPoint(cx: number, cy: number, radius: number, angleDeg: number) {
        const rad = (angleDeg - 90) * Math.PI / 180;

        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    }

    buildPath(startAngle: number, endAngle: number): string {
        const cx = 130;
        const cy = 130;
        const radius = 100;
        const start = this.getPoint(cx, cy, radius, startAngle);
        const end = this.getPoint(cx, cy, radius, endAngle);
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${cx} ${cy}
      L ${start.x} ${start.y}
      A ${radius} ${radius}
      0 ${largeArc} 1
      ${end.x} ${end.y}
      Z
    `;
    }

    buildSlices(data: PieChartData[]): PieSlice[] {

        const total =data.reduce((sum, item) =>sum + item.value,0);
        let startAngle = 0;
        return data.map((item, index) => {

                const percentage =item.value / total;
                const sweepAngle =percentage * 360;

                const endAngle =startAngle +sweepAngle;

                const slice: PieSlice = {
                    label: item.label,
                    value: item.value,
                    percentage,
                    color:
                        COLORS[
                        index %
                        COLORS.length
                        ],
                    startAngle,
                    endAngle,
                    path: this.buildPath(startAngle,endAngle)
                };

                startAngle =endAngle;
                return slice;
            }
        );
    }
}