import { Subscription } from 'rxjs';
import { UserService } from './../../services/user/user.service';
import { ChartsService } from '../../services/charts/charts.service';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss']
})
export class WaterPage implements OnInit, OnDestroy {
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
            water: day.water,
            date: day.date
          };
        });

        this.stats.generateChart({
          canvas: this.canvas,
          dates: this.daysArray.map(day => day.date),
          values: this.daysArray.map(day => day.water),
          chartTitle: 'Water',
          itemLabels: 'Amount'
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value as number);
  }
}
