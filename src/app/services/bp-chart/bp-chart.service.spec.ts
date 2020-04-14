import { TestBed } from '@angular/core/testing';

import { BloodPressureChartService } from './bp-chart.service';

describe('BloodPressureChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodPressureChartService = TestBed.get(
      BloodPressureChartService
    );
    expect(service).toBeTruthy();
  });
});
