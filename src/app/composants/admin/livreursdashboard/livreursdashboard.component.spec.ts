import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreursdashboardComponent } from './livreursdashboard.component';

describe('LivreursdashboardComponent', () => {
  let component: LivreursdashboardComponent;
  let fixture: ComponentFixture<LivreursdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreursdashboardComponent]
    });
    fixture = TestBed.createComponent(LivreursdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
