import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesdashboardComponent } from './recettesdashboard.component';

describe('RecettesdashboardComponent', () => {
  let component: RecettesdashboardComponent;
  let fixture: ComponentFixture<RecettesdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecettesdashboardComponent]
    });
    fixture = TestBed.createComponent(RecettesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
