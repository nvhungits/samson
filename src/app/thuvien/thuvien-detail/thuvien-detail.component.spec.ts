import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuvienDetailComponent } from './thuvien-detail.component';

describe('ThuvienDetailComponent', () => {
  let component: ThuvienDetailComponent;
  let fixture: ComponentFixture<ThuvienDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuvienDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuvienDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
