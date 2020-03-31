import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StepsPage } from './steps.page';

describe('StepsPage', () => {
  let component: StepsPage;
  let fixture: ComponentFixture<StepsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
