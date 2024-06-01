import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringListComponent } from './monitoring-list.component';

describe('MonitoringListComponent', () => {
  let component: MonitoringListComponent;
  let fixture: ComponentFixture<MonitoringListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringListComponent]
    });
    fixture = TestBed.createComponent(MonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
