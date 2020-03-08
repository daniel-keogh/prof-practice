import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietPage } from './diet.page';

describe('DietPage', () => {
  let component: DietPage;
  let fixture: ComponentFixture<DietPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
