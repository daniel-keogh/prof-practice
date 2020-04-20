import { BloodPressure } from './../../interfaces/day';
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

type BpColor = 'danger' | 'success' | 'warning';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.page.html',
  styleUrls: ['./blood-pressure.page.scss'],
})
export class BloodPressurePage implements OnInit, OnDestroy {
  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [];
  daysSubscription: Subscription;
  todaysReadings: BloodPressure[] = [];

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

          // Calculate the average blood pressure for each day
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

          // Check for today's readings so they can be displayed separate
          if (
            new Date().toLocaleDateString() ===
            new Date(day.date).toLocaleDateString()
          ) {
            this.todaysReadings = day.bloodPressure;
          }
        });
      });
  }

  segmentChanged(ev: any) {
    this.createChart(ev.detail.value);
  }

  addClick() {
    // Show a modal page
    this.modalCtrl
      .create({
        component: AddBloodPressure,
      })
      .then((modal) => {
        modal.present();

        modal.onDidDismiss().then((data) => {
          if (data.data) {
            const { diastolic, systolic, time } = data.data.bloodPressure;

            // Update the user's BP
            this.userService
              .updateBloodPressure({
                diastolic,
                systolic,
                time,
              })
              .then(() => {
                // Re-draw the chart
                this.createChart(this.segment.value);
              })
              .catch((err) => {
                // Show an error message
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

  async deleteReading(reading: BloodPressure) {
    // Delete the specified BP reading from today's readings
    await this.userService.deleteBloodPressureItem(reading);
    this.createChart(this.segment.value);
  }

  orderReadings(readings: BloodPressure[]): BloodPressure[] {
    // Order BP readings by their time stamps
    return readings.sort((a, b) => {
      return +new Date(Date.parse(a.time)) - +new Date(Date.parse(b.time));
    });
  }

  bpColour(reading: BloodPressure): BpColor {
    // Color-code the readings depending on whether they're good/bad
    // Reference: American Heart Association

    if (reading.systolic < 120 && reading.diastolic < 80) {
      // Normal
      return 'success';
    } else if (
      (reading.systolic >= 120 || reading.systolic <= 139) &&
      (reading.diastolic >= 80 || reading.diastolic < 90)
    ) {
      // Elevated - Hypertension Stage 1
      return 'warning';
    } else {
      // Hypertension Stage 2 - Crisis
      return 'danger';
    }
  }
}
