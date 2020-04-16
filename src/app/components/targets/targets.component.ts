import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TargetsService } from './../../services/targets/targets.service';
import { Target } from './../../interfaces/target';
import { ModalController, PickerController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import Utils from '../../utils';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss'],
})
export class TargetsComponent implements OnInit {
  target: Target = {
    sleep: 8,
    weight: 140,
    water: 1920,
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
    },
  };

  form: FormGroup;

  constructor(
    private modal: ModalController,
    private pickerCtrl: PickerController,
    private targetService: TargetsService
  ) {}

  ngOnInit() {
    // Read the existing targets from storage
    this.targetService.getTarget().then((data) => {
      if (data) {
        this.target = data;
      }
    });

    this.form = new FormGroup({
      water: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      sleep: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(24),
        ],
      }),
      weight: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
    });

    this.form.patchValue({
      water: this.target.water,
      sleep: this.target.sleep,
      weight: this.target.weight,
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  onSave() {
    if (this.form.status !== 'INVALID') {
      this.target = {
        ...this.target,
        ...this.form.value,
      };

      this.modal.dismiss(this.target);
    }
  }

  async openBloodPressurePicker() {
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
            this.target.bloodPressure = {
              diastolic: value.diastolic.value,
              systolic: value.systolic.value,
            };
          },
        },
      ],
    });

    // Set the values that are selected by default when the picker is opened
    picker.columns[0].selectedIndex = this.target.bloodPressure.systolic;
    picker.columns[1].selectedIndex = this.target.bloodPressure.diastolic;

    await picker.present();
  }
}
