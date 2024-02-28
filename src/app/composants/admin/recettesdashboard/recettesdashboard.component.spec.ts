import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesdashboardComponent } from './recettesdashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('RecettesdashboardComponent', () => {
  let component: RecettesdashboardComponent;
  let fixture: ComponentFixture<RecettesdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecettesdashboardComponent],
      imports: [HttpClientModule,AppModule],
    });
    fixture = TestBed.createComponent(RecettesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
