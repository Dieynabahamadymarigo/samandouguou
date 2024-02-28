import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderdashboardComponent } from './headerdashboard.component';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderdashboardComponent', () => {
  let component: HeaderdashboardComponent;
  let fixture: ComponentFixture<HeaderdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderdashboardComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(HeaderdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
