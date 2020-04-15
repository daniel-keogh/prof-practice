import { UserService } from './../../services/user/user.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss'],
})
export class TargetsComponent implements OnInit {
  constructor(
    private modal: ModalController,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }

  onSubmit() {}
}
