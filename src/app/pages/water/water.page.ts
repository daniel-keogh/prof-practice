import { map, filter } from 'rxjs/operators';
import { UserService } from './../../services/user/user.service';
import { ChartsService } from '../../services/charts/charts.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss']
})
export class WaterPage implements OnInit {
  daysArray: any = [];

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  constructor(private stats: ChartsService, private userService: UserService) {}

  ngOnInit() {
    const days = 7;

    this.userService.getDays().subscribe(data => {
      this.daysArray = data.map(day => {
        return {
          water: day.water,
          date: day.date
        };
      });
      this.createChart(days);
    });
  }

  async createChart(days?: number, months?: number) {
    this.stats.generateChart({
      canvas: this.canvas,
      dates: this.daysArray.map(day => day.date),
      values: this.daysArray.map(day => day.water),
      chartTitle: 'Water',
      itemLabels: 'Amount'
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
