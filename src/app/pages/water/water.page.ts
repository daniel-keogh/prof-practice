import { StatsService } from './../../services/stats/stats.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss']
})
export class WaterPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  constructor(private stats: StatsService) {}

  ngOnInit() {
    const days = 7;
    this.createChart(days);
  }

  async createChart(days?: number, months?: number) {
    // get the array of days with the amount of water drank on each day & generate the chart
    this.stats.generateChart({
      canvas: this.canvas
    });
  }

  segmentChanged(ev: any) {
    let months: number;
    let days: number;

    enum Months {
      month = 1,
      sixMonths = 6,
      year = 12
    }

    switch (ev.detail.value) {
      case 'week':
        days = 7;
        break;
      case 'month':
      case 'year':
        months = Months[ev.detail.value as string];
        break;
      default:
        break;
    }
    this.createChart(days, months);
  }
}
