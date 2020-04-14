import { Stats } from './../../interfaces/stats';
import { Theme } from './../settings/theme.enum';
import { Injectable } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, ThemeService } from 'ng2-charts';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private _selectedTheme: Theme;

  get selectedTheme(): Theme {
    return this._selectedTheme;
  }

  set selectedTheme(value: Theme) {
    this._selectedTheme = value;

    let overrides: ChartOptions;

    // Make sure the chart is clearly visible, even when the app is using
    // a dark theme
    if (this.selectedTheme === Theme.Dark) {
      overrides = {
        title: {
          fontColor: '#d7d8da',
        },
        scales: {
          xAxes: [
            {
              ticks: { fontColor: '#d7d8da' },
              gridLines: { color: 'rgba(255,255,255,0.1)' },
            },
          ],
          yAxes: [
            {
              ticks: { fontColor: '#d7d8da' },
              gridLines: { color: 'rgba(255,255,255,0.1)' },
            },
          ],
        },
      };
    } else {
      overrides = {};
    }

    this.themeService.setColorschemesOptions(overrides);
  }

  private _options: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      fontSize: 16,
      fontColor: '#92949c',
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    hover: {
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            callback: (value) => {
              // TODO: format the dates properly
              return value;
            },
          },
        },
      ],
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      displayColors: false,
      titleFontColor: '#3dc2ff',
      titleFontSize: 13,
      bodyFontSize: 13,
      xPadding: 10,
      yPadding: 10,
    },
  };

  get options(): ChartOptions {
    return this._options;
  }

  private _colors: Color[] = [
    {
      borderColor: 'rgba(82, 96, 255, 1)',
      backgroundColor: 'rgba(82, 96, 255, 0.5)',
      hoverBackgroundColor: 'rgba(82, 96, 255, 0.6)',
      borderWidth: 2.5,
      pointRadius: 1,
      pointHoverRadius: 5,
    },
  ];

  get colors(): Color[] {
    return this._colors;
  }

  set title(title: string) {
    this._options.title.text = title;
  }

  private _chartType: ChartType = 'bar';

  get chartType() {
    return this._chartType;
  }

  set chartType(type: ChartType) {
    this._chartType = type;
  }

  constructor(private themeService: ThemeService) {}

  getStats(chartData: ChartDataSets[]): Stats {
    const allNums = chartData[0].data as number[];

    if (allNums.length) {
      return {
        High: this.getHigh(allNums),
        Low: this.getLow(allNums),
        Average: this.getAvg(allNums),
      };
    } else {
      return null;
    }
  }

  getHigh(nums: number[]): number {
    return Math.max(...nums);
  }

  getLow(nums: number[]): number {
    return Math.min(...nums);
  }

  getAvg(nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }
}
