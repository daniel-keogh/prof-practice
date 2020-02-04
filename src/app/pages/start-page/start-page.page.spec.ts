import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartPagePage } from './start-page.page';

describe('StartPagePage', () => {
  let component: StartPagePage;
  let fixture: ComponentFixture<StartPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
