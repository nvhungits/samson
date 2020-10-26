import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSlidersComponent } from './setting-sliders.component';

describe('SettingSlidersComponent', () => {
  let component: SettingSlidersComponent;
  let fixture: ComponentFixture<SettingSlidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSlidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
