import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodPressurePage } from './blood-pressure.page';

describe('BloodPressurePage', () => {
  let component: BloodPressurePage;
  let fixture: ComponentFixture<BloodPressurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPressurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodPressurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
