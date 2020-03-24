import { Setting } from './../../services/settings/setting.enum';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user/user.service';
import { ChartsService } from '../../services/charts/charts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.page.html',
  styleUrls: ['./weight.page.scss']
})
export class WeightPage implements OnInit, OnDestroy {
  recommended = 1920;
  today = 0;
  points: any;
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Pounds',
      minBarLength: 6
    }
  ];
  daysSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private charts: ChartsService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.charts.title = 'Weight';
    this.storage.get(Setting.Theme).then(theme => {
      if (theme) {
        this.charts.selectedTheme = theme;
      }
    });

    this.createChart();
  }

  ngOnDestroy() {
    this.daysSubscription.unsubscribe();
  }

  async createChart(numWeeks: number = 1) {
    this.daysSubscription = this.userService
      .getDays(numWeeks)
      .subscribe(data => {
        this.chartLabels = [];
        this.chartData[0].data = [];

        data.forEach(day => {
          this.chartLabels.push(day.date);
          this.chartData[0].data.push(day.weight);
        });

        this.points = this.getPoints();
      });
  }

  segmentChanged(ev: any) {
    switch (ev.detail.value) {
      case 'week':
        this.createChart(1);
        break;
      case 'month':
        this.createChart(4);
        break;
      case 'year':
        this.createChart(52);
        break;
      default:
        break;
    }
  }

  getPoints(): any {
    const allNums = this.chartData[0].data as number[];

    return {
      High: Math.max(...allNums),
      Low: Math.min(...allNums),
      Average: allNums.reduce((a, b) => a + b, 0) / allNums.length
    };
  }

  async addClick() {
    const alert = await this.alertCtrl.create({
      header: 'Track Weight',
      subHeader: 'Record your weight for today (lbs).',
      inputs: [
        {
          name: 'weight',
          type: 'number',
          value: 0,
          min: 0
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: label => {
            if (+label.weight >= 0) {
              this.userService
                .updateDay({
                  weight: +label.weight
                })
                .then(() => {
                  this.createChart();
                })
                .catch(err => {
                  this.toastCtrl
                    .create({
                      message: err,
                      duration: 2000
                    })
                    .then(toast => toast.present());
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
