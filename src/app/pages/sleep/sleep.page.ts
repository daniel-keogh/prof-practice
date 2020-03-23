import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Setting } from './../../services/settings/setting.enum';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from './../../services/user/user.service';
import { ChartsService } from './../../services/charts/charts.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss']
})
export class SleepPage implements OnInit, OnDestroy {
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Hours',
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
    this.charts.title = 'Sleep';
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
          this.chartData[0].data.push(day.sleep);
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value as number);
  }

  async addClick() {
    const alert = await this.alertCtrl.create({
      header: 'Track Sleep',
      subHeader: 'How many hours did you sleep?',
      inputs: [
        {
          name: 'sleep',
          type: 'number',
          value: 0,
          min: 0,
          max: 24
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
            if (+label.sleep >= 0) {
              this.userService
                .updateDay({
                  sleep: +label.sleep
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
