import { AddBloodPressure } from './../../components/add-bp/add-bp.component';
import { BloodPressureChartService } from './../../services/bp-chart/bp-chart.service';
import { Setting } from './../../services/settings/setting.enum';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastController, IonSegment, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.page.html',
  styleUrls: ['./blood-pressure.page.scss'],
})
export class BloodPressurePage implements OnInit, OnDestroy {
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [];
  daysSubscription: Subscription;

  @ViewChild('segment', { static: false })
  segment: IonSegment;

  constructor(
    private charts: BloodPressureChartService,
    private storage: Storage,
    private modalCtrl: ModalController,
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
    this.chartData = this.charts.chartData;
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

          let totalSystolic = 0;
          let totalDiastolic = 0;

          day.bloodPressure.forEach((bp) => {
            totalSystolic += bp.systolic;
            totalDiastolic += bp.diastolic;
          });

          this.chartData[0].data.push(
            +(totalSystolic / day.bloodPressure.length).toFixed(3)
          );
          this.chartData[1].data.push(
            +(totalDiastolic / day.bloodPressure.length).toFixed(3)
          );
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value);
  }

  addClick() {
    this.modalCtrl
      .create({
        component: AddBloodPressure,
      })
      .then((modal) => {
        modal.present();

        modal.onDidDismiss().then((data) => {
          if (data.data) {
            const { diastolic, systolic, time } = data.data.bloodPressure;

            this.userService
              .updateDay({
                bloodPressure: [
                  {
                    diastolic,
                    systolic,
                    time,
                  },
                ],
              })
              .then(() => {
                this.createChart(this.segment.value);
              })
              .catch((err) => {
                this.toastCtrl
                  .create({
                    message: err,
                    duration: 2000,
                  })
                  .then((toast) => toast.present());
              });
          }
        });
      });
  }
}
