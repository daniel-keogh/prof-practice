import { Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Theme } from './../settings/theme.enum';
import { ChartsService } from './../charts/charts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BloodPressureChartService {
  constructor(private charts: ChartsService) {}

  get selectedTheme(): Theme {
    return this.charts.selectedTheme;
  }

  set selectedTheme(value: Theme) {
    this.charts.selectedTheme = value;
  }

  get chartData(): ChartDataSets[] {
    return [
      {
        data: [],
        label: 'Systolic',
        fill: false,
        order: 1,
      },
      {
        data: [],
        label: 'Diastolic',
        fill: false,
        order: 2,
      },
    ];
  }

  get options(): ChartOptions {
    return this.charts.options;
  }

  private _colors: Color[] = [
    {
      borderColor: 'rgba(82, 96, 255, 1)',
      backgroundColor: 'rgba(82, 96, 255, 0.5)',
      hoverBackgroundColor: 'rgba(82, 96, 255, 0.6)',
      borderWidth: 4,
      pointRadius: 2,
      pointHoverRadius: 6,
    },
    {
      borderColor: 'rgba(61, 194, 255, 1)',
      backgroundColor: 'rgba(61, 194, 255, 0.5)',
      hoverBackgroundColor: 'rgba(61, 194, 255, 0.6)',
      borderWidth: 4,
      pointRadius: 2,
      pointHoverRadius: 6,
    },
  ];

  get colors(): Color[] {
    return this._colors;
  }

  set title(title: string) {
    this.charts.title = title;
  }

  get chartType() {
    return 'line';
  }
}
