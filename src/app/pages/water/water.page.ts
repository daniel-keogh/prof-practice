import { Setting } from './../../services/settings/setting.enum';
import { AlertController, ToastController, IonSegment } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user/user.service';
import { ChartsService } from '../../services/charts/charts.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss']
})
export class WaterPage implements OnInit, OnDestroy {
  recommended = 1920;
  today = 0;
  points: any;
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Milliliters',
      minBarLength: 6
    }
  ];
  daysSubscription: Subscription;

  @ViewChild('segment', { static: false })
  segment: IonSegment;

  constructor(
    private alertCtrl: AlertController,
    private charts: ChartsService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.charts.title = 'Water Intake';
    this.storage.get(Setting.Theme).then(theme => {
      if (theme) {
        this.charts.selectedTheme = theme;
      }
    });
  }

  ngOnDestroy() {
    this.daysSubscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.createChart(this.segment.value);
  }

  async createChart(period: string) {
    let numWeeks: number;
    switch (period) {
      case 'week':
        numWeeks = 1;
        break;
      case 'month':
        numWeeks = 4;
        break;
      case 'year':
        numWeeks = 52;
        break;
      default:
        return;
    }

    this.daysSubscription = this.userService
      .getDays(numWeeks)
      .subscribe(data => {
        this.chartLabels = [];
        this.chartData[0].data = [];

        data.forEach(day => {
          this.chartLabels.push(day.date);
          this.chartData[0].data.push(day.water);

          if (
            new Date().toLocaleDateString() ===
            new Date(day.date).toLocaleDateString()
          ) {
            this.today = day.water;
          }
        });

        this.points = this.getPoints();
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value);
  }

  getPoints(): any {
    const allNums = this.chartData[0].data as number[];

    return {
      High: Math.max(...allNums),
      Low: Math.min(...allNums),
      Average: allNums.reduce((a, b) => a + b) / allNums.length
    };
  }

  async addClick() {
    const alert = await this.alertCtrl.create({
      header: 'Track Water',
      subHeader: 'How much water have you drank today (ml)?',
      inputs: [
        {
          name: 'water',
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
            if (+label.water >= 0) {
              this.userService
                .updateDay({
                  water: +label.water
                })
                .then(() => {
                  this.createChart(this.segment.value);
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
