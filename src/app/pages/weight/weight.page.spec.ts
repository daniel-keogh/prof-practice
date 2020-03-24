import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightPage } from './weight.page';

describe('WeightPage', () => {
  let component: WeightPage;
  let fixture: ComponentFixture<WeightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
