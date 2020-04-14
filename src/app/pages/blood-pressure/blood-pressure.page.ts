import { Setting } from './../../services/settings/setting.enum';
import { Label, Colors, Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Subscription } from 'rxjs';
import { ChartsService } from './../../services/charts/charts.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastController, PickerController, IonSegment } from '@ionic/angular';
import { PickerColumnOption } from '@ionic/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.page.html',
  styleUrls: ['./blood-pressure.page.scss'],
})
export class BloodPressurePage implements OnInit, OnDestroy {
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Systolic',
      fill: false,
      order: 1,
    },
    {
      data: [],
      label: 'Diastolic',
      fill: false,
      order: 2,
    },
  ];
  colors: Color[] = [
    {
      ...this.charts.colors[0],
      borderWidth: 4,
      pointRadius: 2,
      pointHoverRadius: 6,
    },
    {
      ...this.charts.colors[1],
      borderWidth: 4,
      pointRadius: 2,
      pointHoverRadius: 6,
    },
  ];

  daysSubscription: Subscription;

  @ViewChild('segment', { static: false })
  segment: IonSegment;

  constructor(
    private charts: ChartsService,
    private pickerCtrl: PickerController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.charts.title = 'Blood Pressure';
    this.storage.get(Setting.Theme).then((theme) => {
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
      .subscribe((data) => {
        this.chartLabels = [];
        this.chartData[0].data = [];
        this.chartData[1].data = [];

        data.forEach((day) => {
          this.chartLabels.push(day.date);
          this.chartData[0].data.push(day.bloodPressure.systolic);
          this.chartData[1].data.push(day.bloodPressure.diastolic);
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value);
  }

  async addClick() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'systolic',
          options: this.genPickerRange(250),
        },
        {
          name: 'diastolic',
          options: this.genPickerRange(200),
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.userService
              .updateDay({
                bloodPressure: {
                  diastolic: value.diastolic.value,
                  systolic: value.systolic.value,
                },
              })
              .catch((err) => {
                this.toastCtrl
                  .create({
                    message: err,
                    duration: 2000,
                  })
                  .then((toast) => toast.present());
              });
          },
        },
      ],
    });

    // Set default selected values
    picker.columns[0].selectedIndex = 120;
    picker.columns[1].selectedIndex = 80;

    await picker.present();
  }

  genPickerRange(length: number): PickerColumnOption[] {
    // Generate an array of `length` numbers, starting from 0
    // Reference: https://stackoverflow.com/a/44957114
    return Array(length + 1)
      .fill(0)
      .map((x, y) => {
        const num = x + y;

        return {
          text: num + '',
          value: num,
        };
      });
  }
}
