import { ChartsService } from './../../services/charts/charts.service';
import { RadioPopoverComponent } from 'src/app/components/radio-popover/radio-popover.component';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-headerbar',
  templateUrl: './chart-headerbar.component.html',
  styleUrls: ['./chart-headerbar.component.scss'],
})
export class ChartHeaderbarComponent implements OnInit {
  @Input() title: string;
  @Output() onAddClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private popoverCtrl: PopoverController,
    private charts: ChartsService
  ) {}

  ngOnInit() {}

  addClick(event: any): void {
    this.onAddClicked.emit(event);
  }

  showPopover(event: any) {
    this.popoverCtrl
      .create({
        component: RadioPopoverComponent,
        event,
        translucent: true,
        componentProps: {
          title: 'Chart Type',
          items: ['bar', 'line'],
          value: this.charts.chartType,
        },
      })
      .then((popover) => {
        popover.present();
        return popover.onWillDismiss();
      })
      .then((result) => {
        // Change the value of chart type
        if (result.data) {
          this.charts.chartType = result.data;
        }
      });
  }
}
