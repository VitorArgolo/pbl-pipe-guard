import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesIncidentComponent } from './detalhes-incident.component';

describe('DetalhesIncidentComponent', () => {
  let component: DetalhesIncidentComponent;
  let fixture: ComponentFixture<DetalhesIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesIncidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
