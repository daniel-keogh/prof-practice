import { UserService } from './../../services/user/user.service';
import { ChartsService } from './../../services/charts/charts.service';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss']
})
export class SleepPage implements OnInit, OnDestroy {
  daysArray: any = [];
  daysSubscription: Subscription;

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  constructor(private stats: ChartsService, private userService: UserService) {}

  ngOnInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.daysSubscription.unsubscribe();
  }

  async createChart(numWeeks: number = 1) {
    this.daysSubscription = this.userService
      .getDays(numWeeks)
      .subscribe(data => {
        this.daysArray = data.map(day => {
          return {
            water: day.sleep,
            date: day.date
          };
        });

        this.stats.generateChart({
          canvas: this.canvas,
          dates: this.daysArray.map(day => day.date),
          values: this.daysArray.map(day => day.sleep),
          chartTitle: 'Sleep',
          itemLabels: 'Hours'
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value as number);
  }
}
