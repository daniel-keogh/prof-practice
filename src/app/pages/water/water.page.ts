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
  selector: 'app-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss']
})
export class WaterPage implements OnInit, OnDestroy {
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Amount',
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
    this.charts.title = 'Water Intake';
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
          this.chartData[0].data.push(day.water);
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value as number);
  }

  async addClick() {
    const alert = await this.alertCtrl.create({
      header: 'Track Water',
      subHeader: 'How much water did you drink today?',
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
