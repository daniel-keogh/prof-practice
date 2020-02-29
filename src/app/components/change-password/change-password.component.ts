import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private modal: ModalController) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        current: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        newPwd: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)]
        }),
        confirm: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)]
        })
      },
      this.confirmPasswordValidator
    );
  }

  dismiss() {
    this.modal.dismiss();
  }

  onSubmit() {
    console.log(this.form);
  }

  /* Prevents the user clicking save if newPwd !== confirm
   * Adapted from: https://stackoverflow.com/a/45544111
   */
  confirmPasswordValidator(control: FormGroup) {
    const newPwd = control.get('newPwd');
    const confirm = control.get('confirm');

    if (newPwd && confirm) {
      if (newPwd.value !== confirm.value) {
        return { confirmError: true };
      }
    }
    return null;
  }
}
