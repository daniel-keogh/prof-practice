import { AlertController, ToastController } from '@ionic/angular';
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
            if (label.water) {
              this.userService
                .updateDay({
                  water: +label.water
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
