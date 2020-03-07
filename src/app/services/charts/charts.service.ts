import { Injectable, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private historyChart: Chart;

  constructor() {}

  generateChart({
    canvas,
    dates,
    values,
    chartTitle,
    itemLabels
  }: {
    canvas: ElementRef<HTMLCanvasElement>;
    dates: string[];
    values: number[];
    chartTitle: string;
    itemLabels?: string;
  }): Chart {
    // If a chart was already drawn, destory it and make a new one.
    if (this.historyChart) {
      this.historyChart.destroy();
    }

    return (this.historyChart = new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: itemLabels || '',
            data: values,
            backgroundColor: 'rgba(40, 175, 176, 0.2)',
            borderColor: 'rgba(40, 175, 176, 1)',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: chartTitle,
          fontSize: 16,
          fontColor: '#717172'
        },
        hover: {
          intersect: false
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          displayColors: false,
          titleFontColor: '#ff3366',
          titleFontSize: 13,
          bodyFontSize: 13,
          xPadding: 10,
          yPadding: 10
        }
      }
    }));
  }
}
