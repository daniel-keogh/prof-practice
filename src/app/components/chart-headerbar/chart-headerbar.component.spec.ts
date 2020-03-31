import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartHeaderbarComponent } from './chart-headerbar.component';

describe('ChartHeaderbarComponent', () => {
  let component: ChartHeaderbarComponent;
  let fixture: ComponentFixture<ChartHeaderbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartHeaderbarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartHeaderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
