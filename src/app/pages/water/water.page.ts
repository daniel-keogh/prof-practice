import { RadioPopoverComponent } from 'src/app/components/radio-popover/radio-popover.component';
import { Setting } from './../../services/settings/setting.enum';
import {
  AlertController,
  ToastController,
  IonSegment,
  PopoverController
} from '@ionic/angular';
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
  stats: any;
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
    private popoverCtrl: PopoverController,
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

        this.stats = this.charts.getStats(this.chartData);
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value);
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

  showPopover(event: any) {
    this.popoverCtrl
      .create({
        component: RadioPopoverComponent,
        event,
        translucent: true,
        componentProps: {
          title: 'Chart Type',
          items: ['bar', 'line'],
          value: this.charts.chartType
        }
      })
      .then(popover => {
        popover.present();
        return popover.onWillDismiss();
      })
      .then(result => {
        if (result.data) {
          this.charts.chartType = result.data;
        }
      });
  }
}
