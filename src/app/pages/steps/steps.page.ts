import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Pedometer } from '@ionic-native/pedometer/ngx';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss']
})
export class StepsPage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private pedometer: Pedometer,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    this.startUpdates();
  }

  startUpdates() {
    if (this.platform.is('hybrid')) {
      this.pedometer.startPedometerUpdates().subscribe(
        data => {
          console.log(data);
        },
        err => {
          this.notSupportedAlert(err);
        }
      );
    } else {
      this.notSupportedAlert(
        'Step counting is not supported on this platform.'
      );
    }
  }

  async notSupportedAlert(err: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err,
      buttons: [
        {
          text: 'OK',
          handler: () => this.router.navigate(['/home'])
        }
      ]
    });

    await alert.present();
  }
}
