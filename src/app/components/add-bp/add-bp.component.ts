import { BloodPressure } from './../../interfaces/day';
import {
  ModalController,
  PickerController,
  AlertController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import Utils from '../../utils';

@Component({
  selector: 'app-add-bp',
  templateUrl: './add-bp.component.html',
})
export class AddBloodPressure implements OnInit {
  bp: BloodPressure = {
    systolic: 120,
    diastolic: 80,
  };

  constructor(
    private alertCtrl: AlertController,
    private modal: ModalController,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit() {
    this.bp.time = new Date().toISOString();
  }

  dismiss() {
    this.modal.dismiss();
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'systolic',
          options: Utils.genPickerRange(250),
        },
        {
          name: 'diastolic',
          options: Utils.genPickerRange(200),
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
            this.bp.diastolic = value.diastolic.value;
            this.bp.systolic = value.systolic.value;
          },
        },
      ],
    });

    // Set the values that are selected by default when the picker is opened
    picker.columns[0].selectedIndex = this.bp.systolic;
    picker.columns[1].selectedIndex = this.bp.diastolic;

    await picker.present();
  }

  save() {
    // Omit seconds & milliseconds from the time
    const t = new Date(Date.parse(this.bp.time));
    t.setSeconds(0);
    t.setMilliseconds(0);

    // Validate the time
    if (+t > Date.now()) {
      this.alertCtrl
        .create({
          header: 'Error',
          subHeader: 'Invalid Time',
          message: 'Time cannot be in the future.',
          buttons: ['OK'],
        })
        .then((alert) => {
          alert.present();
        });
    } else {
      // Pass the inputted data back to the BP page
      this.modal.dismiss({
        bloodPressure: {
          systolic: this.bp.systolic,
          diastolic: this.bp.diastolic,
          time: t.toISOString(),
        },
      });
    }
  }
}
