import {
  ModalController,
  PickerController,
  AlertController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PickerColumnOption } from '@ionic/core';

@Component({
  selector: 'app-add-bp',
  templateUrl: './add-bp.component.html',
})
export class AddBloodPressure implements OnInit {
  systolic = 120;
  diastolic = 80;
  time: string;

  constructor(
    private alertCtrl: AlertController,
    private modal: ModalController,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit() {
    this.time = new Date().toISOString();
  }

  dismiss() {
    this.modal.dismiss();
  }

  async openPicker() {
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
            this.diastolic = value.diastolic.value;
            this.systolic = value.systolic.value;
          },
        },
      ],
    });

    // Set the values that are selected by default when the picker is opened
    picker.columns[0].selectedIndex = this.systolic;
    picker.columns[1].selectedIndex = this.diastolic;

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

  save() {
    // Omit seconds & milliseconds from the time
    const t = new Date(Date.parse(this.time));
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
          systolic: this.systolic,
          diastolic: this.diastolic,
          time: t.toISOString(),
        },
      });
    }
  }
}
