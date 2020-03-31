import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  cards = [
    {
      title: 'Diet',
      url: '/diet',
      label: 'Some placeholder text',
      icon: 'fast-food-outline',
      iconColour: 'warning'
    },
    {
      title: 'Exercise',
      url: '/exercise',
      label: 'Some placeholder text',
      icon: 'fitness-outline',
      iconColour: 'danger'
    },
    {
      title: 'Sleep',
      url: '/sleep',
      label: 'Some placeholder text',
      icon: 'bed-outline',
      iconColour: 'success'
    },
    {
      title: 'Steps',
      url: '/steps',
      label: 'Some placeholder text',
      icon: 'walk-outline',
      iconColour: 'secondary'
    },
    {
      title: 'Water',
      url: '/water',
      label: 'Some placeholder text',
      icon: 'water-outline',
      iconColour: 'primary'
    },
    {
      title: 'Weight',
      url: '/weight',
      label: 'Some placeholder text',
      icon: 'body-outline',
      iconColour: 'dark'
    }
  ];

  constructor() {}
}
