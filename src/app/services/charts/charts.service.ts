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
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: itemLabels || '',
            data: values,
            backgroundColor: 'rgba(82, 96, 255, 0.2)',
            hoverBackgroundColor: 'rgba(82, 96, 255, 0.3)',
            borderColor: 'rgba(82, 96, 255, 1)',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            minBarLength: 6
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
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: value => {
                  // TODO: format the dates properly
                  return value;
                }
              }
            }
          ]
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          displayColors: false,
          titleFontColor: '#3dc2ff',
          titleFontSize: 13,
          bodyFontSize: 13,
          xPadding: 10,
          yPadding: 10
        }
      }
    }));
  }
}
