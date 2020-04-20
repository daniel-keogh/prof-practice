import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cards = [
    {
      title: 'Diet',
      url: '/diet',
      icon: 'fast-food-outline',
      iconColour: 'warning',
    },
    {
      title: 'Exercise',
      url: '/exercise',
      icon: 'fitness-outline',
      iconColour: 'danger',
    },
    {
      title: 'Sleep',
      url: '/sleep',
      icon: 'bed-outline',
      iconColour: 'success',
    },
    {
      title: 'Steps',
      url: '/steps',
      icon: 'walk-outline',
      iconColour: 'secondary',
    },
    {
      title: 'Water Intake',
      url: '/water',
      icon: 'water-outline',
      iconColour: 'primary',
    },
    {
      title: 'Blood Pressure',
      url: '/blood-pressure',
      icon: 'heart-outline',
      iconColour: 'danger',
    },
    {
      title: 'Weight',
      url: '/weight',
      icon: 'body-outline',
      iconColour: 'dark',
    },
  ];

  constructor() {}
}
