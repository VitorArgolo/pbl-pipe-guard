import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusServidorApiComponent } from './status-servidor-api.component';

describe('StatusServidorApiComponent', () => {
  let component: StatusServidorApiComponent;
  let fixture: ComponentFixture<StatusServidorApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusServidorApiComponent]
    });
    fixture = TestBed.createComponent(StatusServidorApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
