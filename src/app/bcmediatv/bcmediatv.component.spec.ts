import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcmediatvComponent } from './bcmediatv.component';

describe('BcmediatvComponent', () => {
  let component: BcmediatvComponent;
  let fixture: ComponentFixture<BcmediatvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcmediatvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcmediatvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
