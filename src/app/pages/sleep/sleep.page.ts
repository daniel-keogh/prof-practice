import { AlertController, ToastController } from '@ionic/angular';
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
  constructor(
    private alertCtrl: AlertController,
    private stats: ChartsService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

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
            sleep: day.sleep,
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
            if (label.sleep) {
              this.userService
                .updateDay({
                  sleep: +label.sleep
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
